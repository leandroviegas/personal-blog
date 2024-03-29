import React, { useState } from "react";

import Layout from "@layouts/UserLayout";
import api from "@services/api";

import { Topic, Post } from "@classes/blog";

import PostCard from "@components//Cards/PostCard";
import SeoHead from "@components/Head";
import { toast } from "react-toastify";

export async function getServerData({ params }) {
  try {
    const data = await api
      .get(`/posts/by-topic?topic_link=${params.link}`)
      .then((resp) => resp.data);

    return {
      props: data,
      headers: {
        "Cache-Control":
          "public, max-age=600, s-maxage=600, stale-while-revalidate=300",
      },
    };
  } catch (error) {
    console.error(error);
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
      title={`${serverData.topic.name} - Leandro Viegas`}
      description="Sou desenvolvedor e trabalho com diversas tecnologias"
    />
  );
}

function TopicPage({ serverData }) {
  const [data, setData] = useState<{
    status: "loading" | "error" | "success" | "idle";
    topic: Topic;
    posts: Post[];
    total: number;
  }>({ ...serverData, status: "idle" });

  const [page, setPage] = useState<number>(Math.max(0, serverData.page));

  function HandleLoadMorePosts () {
    setData({ ...data, status: "loading" });
    api
      .get(`/posts/by-topic`, {
        params: { topic_link: data.topic.link, page: page + 1 },
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
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-4 mx-auto">
        <div className="col-span-3 my-8 rounded">
          <div className="my-12">
            <h1 className="text-2xl mx-4 font-semibold text-zinc-900 dark:text-zinc-50">
              {data.topic.name}
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

export default TopicPage;
