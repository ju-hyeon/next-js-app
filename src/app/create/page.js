"use client"

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();


    return (
        // 사용자와 상호작용하는 것은 서버컴포넌트에서 다루지 않음
        // 'use client'를 사용해서 클라이언트 컴포넌트에서 사용해야 함
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL + 'posts', options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                
                // 라우터를 사용해서 방금 생성한 글로 리디렉션
                router.refresh();
                router.push(`/read/${lastid}`);
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body" />
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}