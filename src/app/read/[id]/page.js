export default async function Read(props){
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `posts/${props.params.id}`, { cache:"no-store"});
    const post = await resp.json();

    return (
        <>
            <h2>{post.title}</h2>
            {post.author}
        </>
    )
}  