import React from 'react'
import './css/Contact.css'
import Metadata from '../layout/Metadata'
import { Accordion } from 'react-bootstrap'

const Contact = ({ title }) => {
    const faqs = [
        {
            question: "What is STS?",
            answer:
                "Streets to Schools is a youth non-government organization that was founded in 2017 by Qjiel Mariano after attending the Young Bridging Leaders Program. Seeing the current condition of children and the struggles they face with their education and basic rights, what started as a passion project to serve the children evolved into a full-fledged organization with 17 chapters across the nation. STS is composed of young people aged 13 to 25 that aims to actively bridge children and youth in street situations, empowering them towards a brighter future.",
        },
        {
            question: "What are our advocacies?",
            answer:
                "STS strives to amplify the Global Goals for Sustainable Development and UN Convention on the Rights of the Child, investing in the young to achieve the 2030 agenda and beyond. Education and children’s rights are at the forefront of our advocacies but are not the only goals we aim to attain, we push towards having all their basic needs met for their holistic development. Zero Hunger, Affordable and Clean Energy, Good Health and Well-Being, and Climate Action are but a few of the goals we actively seek to achieve.",
        },
        {
            question: "What can I expect in STS?",
            answer:
                "A whole array of projects await our volunteers! From online advocacy campaigns to face-to-face storytelling, our projects cater to the different immediate and social needs of the children. Expect programs such as community assessments, medical missions, storytelling sessions, donation drives, webinars, partnerships with other organizations and many more. One notable project started by STS is Ladders to Literacy, an educational program where we provide children the necessary tools to help increase their literacy rate and guide them in writing their own picture book.",
        },
        {
            question: "How can I join?",
            answer:
                "With the establishment of our 17 chapters across the Philippines, there is definitely a chapter for you! You may message the FB page of Streets to Schools or the FB page of your chosen chapter. You may also access the link for memberships here: https://tinyurl.com/Streets2Schools",
        },
        {
            question: "How can I partner?",
            answer:
                "STS is open for partnerships for face-to-face projects and online campaigns, you may contact us via our official FB page or through this link: https://tinyurl.com/Streets2Schools You may also contact a specific chapter via their FB page for details concerning a specific partnership with them.",
        },
        {
            question: "How can I donate?",
            answer:
                "Monetary donations may be coursed through this link: [LINK] Rest assured, transparency reports will be released to inform you of how the donations are used for our projects.",
        },
    ]

    return (
        <div
            className="bg_image content-container">
            <Metadata title={title} />

            <div id="contact">
                <br /><br /><br /><br />
                <h1 className="text-center" style={{ fontSize: "3.5vw" }}>
                    Frequently Asked Questions
                </h1>
                <br />
                <FrequentlyAskedQuestions faqs={faqs} />

                <div className="main_content">
                    <br />
                    <h1 style={{ fontSize: "3.5vw" }} className="text-center">
                        Contact Us
                    </h1>
                    <div style={{ fontSize: "2vw" }} className="info">
                        Get in touch and let us know how we can help
                    </div>

                    <div className="flex-container-contact">
                        <div className="flex-item-contact" id="div-contact">
                            <a href="mailto:streetstoschools.org@gmail.com" target="_blank">
                                <img
                                    src="/images/ContactUs_Gmail.png"
                                    alt="gmail"
                                    style={{ width: "100%" }}
                                />
                            </a>
                        </div>
                        <div className="flex-item-contact" id="div-contact">
                            <a
                                href="https://www.facebook.com/StreetstoSchoolsProject/"
                                target="_blank"
                            >
                                <img src="/images/ContactUs_FB.png" alt="fb" style={{ width: "100%" }} />
                            </a>
                        </div>
                        <div className="flex-item-contact" id="div-contact">
                            <a
                                href="https://www.instagram.com/streetstoschools.project/"
                                target="_blank"
                            >
                                <img src="/images/ContactUs_IG.png" alt="ig" style={{ width: "100%" }} />
                            </a>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};



const FrequentlyAskedQuestions = ({ faqs }) => {
    return (
        <Accordion className='container'>
            {faqs.map((faq, index) => (
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>
                        {faq.answer}
                    </Accordion.Body>
                </Accordion.Item>
            ))}

        </Accordion>
    )
}

export default Contact