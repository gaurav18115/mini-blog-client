
import BlogPostsGridComponent from "@/components/BlogPostsGridComponent";
import HeaderComponent from "@/components/HeaderComponent";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <HeaderComponent/>
            <BlogPostsGridComponent posts={[]}/>
        </main>
    );
}
