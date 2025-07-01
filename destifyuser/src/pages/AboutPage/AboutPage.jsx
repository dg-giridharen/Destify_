import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard.jsx';
import Hero from '../../components/Hero/Hero.jsx'; // We'll use the original Hero component here
import './AboutPage.css';
import teamMemberImage from '../../assets/team.png';

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    { name: 'Ashley Spencer', title: 'Founder & CEO', image: teamMemberImage, socials: { linkedin: '#', twitter: '#' } },
    { name: 'Teresa Mendes', title: 'Lead Trip Planner', image: teamMemberImage, socials: { linkedin: '#', twitter: '#' } },
    { name: 'Samuel Owen', title: 'Adventure Specialist', image: teamMemberImage, socials: { linkedin: '#', twitter: '#' } },
    { name: 'Beatrice Hansen', title: 'Cultural Guide', image: teamMemberImage, socials: { linkedin: '#', twitter: '#' } },
  ];

  return (
    <div>
      <Navbar onLoginClick={() => setIsModalOpen(true)} />
      
      {/* The original Hero from the home page now lives here */}
      <Hero /> 

      <div className="about-page-container">
        <section className="team-section-about">
          <h2 className="team-title-about">Meet Our Team of Experts</h2>
          <p className="team-subtitle-about">The passionate individuals dedicated to making your dream trip a reality.</p>
          <div className="team-cards-about">
            {teamMembers.map((member) => (
              <TeamMemberCard 
                key={member.name} 
                name={member.name} 
                title={member.title} 
                image={member.image} 
                socials={member.socials}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AboutPage;