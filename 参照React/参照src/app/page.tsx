
import styles from "@/app/page.module.css"
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export const metadata = {
  title: "Index Page",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Main page="index" />
      <Footer />
    </div>
  );
}