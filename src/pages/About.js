import React from 'react';
import { Container } from 'reactstrap';
import MainLayout from './layout/MainLayout';


function About(props) {
  return (
    <MainLayout {...props}>
      <Container>
        <div style={{height: '450px'}}>
          <h3>About</h3>
          <p>
            JKT48 SHOWROOM adalah website fanmade yang bertujuan untuk memfilter room member JKT48. <br />
            disini kalian bisa mencoba ngidol dengan pengalaman baru dan User Interface yang berbeda, <br />
            selain itu kalian bisa melihat daftar room member jeketi dan jadwal showroom member yang akan live.
          </p>
          <p>
            Website JKT48 Showroom ini di kembangkan oleh 
            <a style={{color: '#24a2b7'}} href="https://twitter.com/inzoid" target="_blank"> <b>Inzoid</b> </a>
            dan masih terus di develop sampe saat ini
          </p>
          <p>Source :</p>
          <ul>
            <li>
              <a href="https://www.showroom-live.com/" target="_blank">
                https://www.showroom-live.com
              </a> (Official Showroom)
            </li>
            <li>
              <a href="https://qiita.com/takeru7584/items/f4ba4c31551204279ed2" target="_blank">
                https://qiita.com/takeru7584/items/f4ba4c31551204279ed2
              </a> (Showroom API)
            </li>
          </ul>
        </div>
      </Container>
    </MainLayout>
  );
}

export default About;
