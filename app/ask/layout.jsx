import Footer from "@/components/navigation/footer";
import TopNavigation from "@/components/navigation/navigation";

export default function RootLayout({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-between bg-nav-gray/50">
                <TopNavigation />
                {children}
                <Footer />
            </div>
        </>
    );
}
