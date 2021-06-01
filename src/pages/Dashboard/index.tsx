import React, { useState } from 'react';

import Header from 'src/components/Header';
import Card from 'src/components/Card';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const [highlights, setHighlights] = useState([
    {
      marvel_id: 1689,
      title:
        'Official Handbook of the Marvel Universe (2004) #10 (MARVEL KNIGHTS)',
      description:
        "On the mean streets of the Marvel Universe, the kid gloves come off. Guardian devils, vengeance-seeking vigilantes and enigmatic assassins stalk the city's dark underbelly _ and the urban action unfolds with gritty intensity. The newest entry in Marvel's best-selling Handbook series, OHOTMUMK04 includes in-depth bios on a host of the House's edgiest icons - from Black Panther to Shang-Chi!",
      picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/30/4bc64df4105b9.jpg'
    },
    {
      marvel_id: 20956,
      title: 'Penance: Relentless (2008)',
      description:
        'From the pages of CIVIL WAR: FRONT LINE and THUNDERBOLTS! Once he was a hero, now only a shell of Robbie Baldwin remains. As Penance, he begins a slow descent into madness: the most hated man in America, blamed for the disaster at Stamford, tortured by visions of his failure and obsessed with strange, seemingly meaningless numbers. A relentless pursuit begins... Collecting PENANCE: RELENTLESS #1-5.\r<br>Rated T+ ...$13.99\r<br>',
      picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/90/4bb860a46f58d.jpg'
    },
    {
      marvel_id: 323,
      title: 'Ant-Man (2003) #2',
      description:
        'Ant-Man digs deeper to find out who is leaking secret information that threatens our national security.\r\n32 pgs./PARENTAL ADVISORY...$2.99',
      picture: 'http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0.jpg'
    },
    {
      marvel_id: 384,
      title: 'Gun Theory (2003) #3',
      description:
        "The phone rings, and killer-for-hire Harvey embarks on another hit. But nothing's going right this job. There's little room for error in the business of killing - so what happens when one occurs?\r\n\r\n32 PGS./ PARENTAL ADVISORY ...$2.50",
      picture: 'http://i.annihil.us/u/prod/marvel/i/mg/c/60/4bc69f11baf75.jpg'
    }
  ]);

  return (
    <S.Container>
      <Header />

      <S.Highlights>
        {highlights.map(comic => (
          <Card
            key={comic.marvel_id}
            id={comic.marvel_id}
            img={comic.picture}
            name={comic.title}
            isFav={false}
          />
        ))}
      </S.Highlights>

      <S.Favorites>
        <h2 id="characters">Meus personagens favoritos</h2>

        <div>
          <Card
            id={1}
            img="http://i.annihil.us/u/prod/marvel/i/mg/9/30/4bc64df4105b9.jpg"
            isFav={false}
          />
        </div>

        <h2 id="comics">Minhas comics favoritas</h2>

        <div>
          <Card
            id={1}
            img="http://i.annihil.us/u/prod/marvel/i/mg/9/30/4bc64df4105b9.jpg"
            isFav={false}
          />
        </div>
      </S.Favorites>
    </S.Container>
  );
};

export default Dashboard;
