"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // 사이드이팩트를 처리할 훅을 가져옴
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + 'posts/' + id)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
        console.log(result);
      });
  }, []);

  return (
    // 사용자와 상호작용하는 것은 서버컴포넌트에서 다루지 않음
    // 'use client'를 사용해서 클라이언트 컴포넌트에서 사용해야 함
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + 'posts/' + id, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;

            // 라우터를 사용해서 방금 생성한 글로 리디렉션
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
