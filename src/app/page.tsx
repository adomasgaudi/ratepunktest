
import st from './page.module.sass'
import { Footer, NavBar, SectionMain, SectionStore } from './sections';

export default function Home() {
  return (
    <main className={st.test}>
      <NavBar></NavBar>
      <SectionMain></SectionMain>
      <SectionStore></SectionStore>
      <Footer></Footer>
    </main>
  );
}
