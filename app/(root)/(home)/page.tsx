import { Button } from '@/components/ui/button';
import Teachers from './teachers/page';
import { ArrowDown } from 'lucide-react';
import Statics from './statics';
import Features from './features';
import Team from './team';
import Hero from './hero';
import Contact from './contact';

const Home = () => {
  return (
    <section className="text-white mb-8">
      <Hero />

      <div id="statics" className="pt-28">
        <Statics />
      </div>

      <div id="teachers" className="pt-16 -mb-8">
        <Teachers limit={3} />
        <a href="/teachers" className="flex justify-center mb-12 -mt-12">
          <Button variant="secondary" size={'lg'} className="text-lg">
            Show more <ArrowDown />
          </Button>
        </a>
      </div>

      <div id="features" className="pt-32 -mb-12">
        <Features />
      </div>

      {/* <div id="team" className="pt-20 -mb-20">
        <Team />
      </div> */}

      <div id="contact" className="pt-32">
        <Contact />
      </div>
    </section>
  );
};

export default Home;
