
import st from './page.module.sass'
import { Footer, SectionMain, SectionStore } from './sections';
import { NavBar } from './sections/nav';

export default function Home() {
  return (
    <main>
      <NavBar />
      <SectionMain />
      <SectionStore />
      <Footer />
    </main>
  );
}
