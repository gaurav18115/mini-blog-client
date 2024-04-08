
import BlogPostsComponent from "@/components/BlogPostsGridComponent";
import HeaderComponent from "@/components/HeaderComponent";
import BackgroundBlurComponent from "@/components/BackgroundBlurComponent";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <HeaderComponent/>
            <BackgroundBlurComponent/>
            <BlogPostsComponent posts={[]}/>
        </main>
    );
}
