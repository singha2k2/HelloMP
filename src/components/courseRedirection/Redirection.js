import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OopsBasics from "../learnings/oops/basics";
import VideoPlayerUi from '../VideoPlayer/VideoPlayerUi';

function Redirection() {
    const {courseName} = useParams();

    const renderCourseComponent = () => {
        switch (courseName) {
          case 'learn-oops-in-java':
            
            return <OopsBasics />;
          case 'LearnHelloWorld':
            const sections = [
                {
                  title: "Basic Java Functions",
                  items: [
                    { item: "Video No. 1", url: "https://www.youtube.com/watch?v=Y-ubmaLsd5E" },
                    { item: "Video No. 2", url: "https://www.youtube.com/watch?v=G81hoJTvQVg" },
                    { item: "Video No. 3", url: "https://www.youtube.com/watch?v=5Bp6GLU6HKE" },
                    { item: "Video No. 4", url: "https://www.youtube.com/watch?v=KYogNWbjZIU" },
                    { item: "Video No. 5", url: "https://www.youtube.com/watch?v=gZ1KbP2J2PA" },
                  ],
                },
                {
                  title: "Practical Hands on",
                  items: [
                    { item: "Video No. 6", url: "https://www.youtube.com/watch?v=Hh723SKuxZs" },
                    { item: "Video No. 7", url: "https://www.youtube.com/watch?v=upQu_brz7OI" },
                    { item: "Video No. 8", url: "https://www.youtube.com/watch?v=4f82EYG81c0" },
                    { item: "Video No. 9", url: "https://www.youtube.com/watch?v=_sEcUuGcAKQ" },
                    { item: "Video No. 10", url: "https://www.youtube.com/watch?v=4PGmawV0aA4" },
                  ],
                },
              ];
            return <VideoPlayerUi sections={sections}/>;
          case 'LearnPolymorphism':
            const sectionsPoly = [
                {
                  title: "Learn to Code",
                  items: [
                    { item: "Video No. 11", url: "https://www.youtube.com/watch?v=iU4YwYmkaXo" },
                    { item: "Video No. 12", url: "https://www.youtube.com/watch?v=Rilk5TayNbI" },
                    { item: "Video No. 13", url: "https://www.youtube.com/watch?v=NbzZAdGFXWY" },
                    { item: "Video No. 14", url: "https://www.youtube.com/watch?v=o-GKDoAqUH4" },
                    { item: "Video No. 15", url: "https://www.youtube.com/watch?v=-OH3d2Zu_gA" },
                  ],
                },
                {
                  title: "Lets Get Real",
                  items: [
                    { item: "Video No. 16", url: "https://www.youtube.com/watch?v=xCOmQ6t9J7Y" },
                    { item: "Video No. 17", url: "https://www.youtube.com/watch?v=12TPtXSPJTg" },
                    { item: "Video No. 18", url: "https://www.youtube.com/watch?v=OtNV1xzMvS4" },
                    { item: "Video No. 19", url: "https://www.youtube.com/watch?v=tazwzyMRwcM" },
                    { item: "Video No. 20", url: "https://www.youtube.com/watch?v=jYNUsgHV_EU" },
                  ],
                },
              ];
            return <VideoPlayerUi sections={sectionsPoly}/>;
          case 'LearnEncapsulation':
            const sectionsEncap = [
                {
                  title: "Encap Basics",
                  items: [
                    { item: "Video No. 21", url: "https://www.youtube.com/watch?v=me_HtNE_JJk" },
                    { item: "Video No. 22", url: "https://www.youtube.com/watch?v=xd_pRY_SYKg" },
                    { item: "Video No. 23", url: "https://www.youtube.com/watch?v=5w0NQex4uII" },
                    { item: "Video No. 24", url: "https://www.youtube.com/watch?v=2elPLp_JKYg" },
                    { item: "Video No. 25", url: "https://www.youtube.com/watch?v=vc8OF3-UdIA" },
                  ],
                },
                {
                  title: "Advance Java",
                  items: [
                    { item: "Video No. 26", url: "https://www.youtube.com/watch?v=6UfXKx2Q59Q" },
                    { item: "Video No. 27", url: "https://www.youtube.com/watch?v=QWmy0xSSaEY" },
                    { item: "Video No. 28", url: "https://www.youtube.com/watch?v=8FSub9s0fB0" },
                    { item: "Video No. 29", url: "https://www.youtube.com/watch?v=DLxblvvN8Nw" },
                    { item: "Video No. 30", url: "https://www.youtube.com/watch?v=oY4SkTjkXyg" },
                  ],
                },
              ];
            return <VideoPlayerUi sections={sectionsEncap}/>;
          case 'LearnAbstarction':
            const sectionsAbs = [
                {
                  title: "Learn Beyond Imagination",
                  items: [
                    { item: "Video No. 31", url: "https://www.youtube.com/watch?v=IzJ9v8MTVoM" },
                    { item: "Video No. 32", url: "https://www.youtube.com/watch?v=Ov8amkjkyH8" },
                    { item: "Video No. 33", url: "https://www.youtube.com/watch?v=jAf1n0FRprM" },
                    { item: "Video No. 34", url: "https://www.youtube.com/watch?v=sWbzcMYkt8g" },
                    { item: "Video No. 35", url: "https://www.youtube.com/watch?v=xTXz91EivsQ" },
                  ],
                },
                {
                  title: "Final Good Bye Code",
                  items: [
                    { item: "Video No. 36", url: "https://www.youtube.com/watch?v=RaAp-f2Np1U" },
                    { item: "Video No. 37", url: "https://www.youtube.com/watch?v=jUJ4CMPFkM4" },
                    { item: "Video No. 38", url: "https://www.youtube.com/watch?v=kZdwXMzMwYY" },
                    { item: "Video No. 39", url: "https://www.youtube.com/watch?v=louYAgvTsLY" },
                    { item: "Video No. 40", url: "https://www.youtube.com/watch?v=GtsoUtGXu4Q" },
                  ],
                },
              ];
            return <VideoPlayerUi sections={sectionsAbs}/>;
          default:
            return <div>Course not found</div>;
        }
      };
    
      return <div>{renderCourseComponent()}</div>;

}

export default Redirection