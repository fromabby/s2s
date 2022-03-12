import React from "react";
import "./About.css";

const About = () => {
  return (
    <div
      class="bg_image content-container"
      style={{
        backgroundImage: 'url(/public/images/bg.png)',
        backgroundSize: "cover",
      }}
    >
      <div className="about">

        <div class="about-us-body">
          <div class="container-md">
            <div class="row">
              <div class="col-md-3">
                <div class="flex-container">
                  <img id="aboutus-img" src="/images/Footer_logo.png" />
                </div>
              </div>
              <div class="col-md-9">
                <div class="text">
                  <br />
                  <p style={{ fontSize: "20px" }}>
                    <b>Streets to Schools</b> is a youth organization actively
                    bridging children and youth in street situations by
                    amplifying the Global Goals for Sustainable Development
                    and UN Convention on the Rights of the Child. Investing in
                    the young to achieve 2030 and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="container-md">
            <div class="col-md-12">
              <div class="text">
                {" "}
                <br />
                <h1 class="title">OUR MISSION</h1>
                <br />
                <p style={{ fontSize: 18 }}>
                  Showcase the significance of quality education and highlight
                  the value of lifelong learning by giving out-of-school youth
                  the invaluable opportunity to learn. By valuing rights-based
                  and needs-based approaches, Streets to Schools enables
                  out-of-school youth to go back to schools through the
                  implementation of the United Nations Sustainable Development
                  Goals.
                </p>
              </div>
            </div>
          </div>
          <div class="container-md">
            <div class="col-md-12">
              <div class="text">
                <br />
                <h1 class="title">OUR VISION</h1> <br />
                <p style={{ fontSize: 18 }}>
                  Streets to Schools envisions itself as an avenue for all
                  stakeholders and beneficiaries to be in a continued
                  co-learning process where education is given paramount
                  importance. Furthermore, Streets to Schools hopes to go
                  beyond the sustainable development goals, highlighting
                  partnership through the SDGs to contribute to the 2030
                  agenda, and branch out from Metro Manila by sharing its
                  advocacy to young leaders.
                </p>
              </div>
            </div>
          </div>

          <div class="container-md">
            <div class="row">
              <div class="col-xs-12 center-block text-center">
                <div class="text">
                  <h1 class="title">
                    <b>MEET THE TEAM</b>
                  </h1>
                  <br />
                  <br />
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member5.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Qjiel Mariano</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Founder
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member4.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Marie Frances Pagaduan</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Deputy Director for Internal Affairs
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member17.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Charlene Joyce Uy</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Secretariat
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member6.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Emilyn Dunton</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Financier
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member7.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Richard Gonzalez</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Crisis Director
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member10.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Kiara Delgado</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Memberships Coordinator
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member21.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Nicole Ann Vergara</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Strategy and Planning Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member1.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Ambriel Pascual</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Advocacy Coordinator
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member2.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Patricia Bojador</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Advocacy Coordinator
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member9.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Jessica Dimaandal</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Partnerships Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member15.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Alexa Taay</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Partnerships Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member11.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Trixie Bautista</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Partnerships Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member13.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Bianca Adia</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Partnerships Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member12.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Kayla Fernandez</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Partnerships Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member20.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Margarita Tipton</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Sponsorships and Grants Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member14.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Aaliyah Duran</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Public Relations Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member3.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Daphne Basuel</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Education and Research Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member8.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Janis Santiago</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Logistics Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member16.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Anne Drea Camus</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Logistics Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member18.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Jeremiah Dimasacat</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Stakeholder Engagement Officer
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="img-container">
                  <img id="team-img" src="/images/member19.png" style={{ width: "100%" }} alt='member' />
                </div>
                <div class="text-team">
                  <br />
                  <p style={{ fontSize: "22px" }}>
                    <b>Troy Angelo Bisa</b>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Stakeholder Engagement Officer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="container-md">
            <div class="col-md-12">
              <div class="text">
                <h1 class="title">AWARDS & RECOGNITIONS</h1>
                <br />
              </div>

              <ul style={{ fontSize: "18px" }} class="aboutus-recognitions">
                <li>Winner, ESD Okayama Awards 2021</li>
                <li>
                  Outstanding GYS Alumni Safe Space Heroes 2021 [Karapatan at
                  Kabataan Paligsahan ng Mga Maikling Pelikula]
                </li>
                <li>
                  2nd Place, Harvard Innovation Challenge Southeast Asia
                  Well-Being and Equity Track
                </li>
                <li>
                  United Nations Population Fund Kabayani Challenge Fund
                  Winner
                </li>
                <li>
                  Advocates' Choice Award (Inter-Pillar Category) of the SDG
                  Youth Awards in the Asia Pacific 2020
                </li>
                <li>Outstanding GYS Alumni Safe Space Heroes 2020</li>
                <li>
                  People Defender of the Year, Global Institute for Youth
                  Development NYLC
                </li>
                <li>
                  Winner, Jesse M. Robredo Foundation Be Like Jesse Youth
                  Grant Competition [Ladders to Literacy]
                </li>
                <li>
                  National Finalist, 18th Ten Accomplished Youth Organization
                  (TAYO) Awards [PelikuLansangan]
                </li>
                <li>
                  National Finalist, 17th Ten Accomplished Youth Organization
                  (TAYO) Awards [Ladders to Literacy]
                </li>
                <li>Top 5, Global Youth Summit Seed Grant Competition</li>
                <li>
                  Finalist, Jesse M. Robredo Foundation Be Like Jesse Youth
                  Grant Competition (Alitaptap)
                </li>
                <li>Live Screening Qualifiers, Ideas Positive 10</li>
                <li>
                  Shortlisted, Ten Accomplished Youth Organization Awards
                  (Alitaptap)
                </li>
                <li>Finalist, Sikhay Youth Community Service Awards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
