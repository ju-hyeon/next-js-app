export default async function Read(props){
    const resp = await fetch(`http://localhost:9999/posts/${props.params.id}`);
    const post = await resp.json();

    return (
        <>
            <h2>{post.title}</h2>
            {post.author}
        </>
    )
}  