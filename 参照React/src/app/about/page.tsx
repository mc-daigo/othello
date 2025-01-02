
import styles from "@/app/page.module.css"
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

const titleName:string = "About Page"

export const metadata = {
  title: titleName,
};

export default function About() {
  return (
    <div className={styles.page}>
      <Header />
      <Main page="about" />
      <Footer />
    </div>
  );
}
