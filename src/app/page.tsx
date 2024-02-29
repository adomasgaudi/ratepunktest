
import { Footer, SectionStore } from './sections';
import { NavBar } from './sections/nav';
import { SectionMain } from './sections/sectionMain';

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
