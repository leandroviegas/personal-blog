import React, { useState } from "react";

import Layout from "@layouts/UserLayout";
import api from "@services/api";

import { Post } from "@classes/blog";

import PostCard from "@components/Cards/PostCard";
import SeoHead from "@components/Head";
import { toast } from "react-toastify";

export async function getServerData({ params }) {
  try {
    const data = await api
      .get(`/posts/search?search=${params.search}`)
      .then((resp) => resp.data);

    return {
      props: { ...data, params },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}

export function Head({ serverData }) {
  return (
    <SeoHead
      title={`Procurar - ${serverData.params?.search} - Leandro Viegas`}
      description="Sou desenvolvedor e trabalho com diversas tecnologias"
    />
  );
}

function SearchPage({ serverData }) {
  const [data, setData] = useState<{
    status: "loading" | "error" | "success" | "idle";
    posts: Post[];
    total: number;
  }>({ ...serverData, status: "idle" });

  const [page, setPage] = useState<number>(Math.max(0, serverData.page));

  function HandleLoadMorePosts() {
    if (data.status === "loading") return;

    setData({ ...data, status: "loading" });

    api
      .get(`/posts/search`, {
        params: { search: serverData.params?.search, page: page + 1 },
      })
      .then((response) => {
        setPage(page + 1);
        setData({
          ...data,
          posts: data.posts + response.data.posts,
          status: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        setData({ ...data, status: "error" });
        toast(
          `Ocorreu um erro ao carregar os postagens:\n ${
            err.response?.data?.message || err.message
          }`,
          {
            position: "top-center",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };

  return (
    <Layout search_={serverData.params?.search}>
      <div className="container grid grid-cols-1 lg:grid-cols-4 mx-auto">
        <div className="col-span-3 my-8 rounded">
          <div className="my-12">
            <p className="text-zinc-900 dark:text-zinc-50 text-sm font-thin">
              resultados para:
            </p>
            <h1 className="text-2xl mx-4 font-semibold text-zinc-900 dark:text-zinc-50">
              "{serverData.params?.search}"
            </h1>
            <hr className="my-2 border-gray-800 dark:border-zinc-200" />
            <div className="md:my-6">
              {data.posts.map((p) => (
                <PostCard key={p.link} {...p} />
              ))}
            </div>
            <div className="my-4 flex justify-center">
              {Math.max(1, page) >= data.total / 25 ?? (
                <button
                  onClick={HandleLoadMorePosts}
                  className="rounded-xl hover:bg-gray-200 text-gray-600 hover:text-gray-700 dark:hover:bg-zinc-500 dark:text-gray-300 dark:hover:text-gray-100 transition border px-3 py-1"
                >
                  Carregar mais
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
