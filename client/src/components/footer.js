import React from 'react'
import {MdVerifiedUser} from 'react-icons/md'
import document from '../assets/document.jpg'
import { Link } from "react-router-dom";
import banner from '../assets/bannerAbout.mp4'
import facebook  from "../assets/Images/facebook.svg";
import google  from "../assets/Images/google.svg";
import twitter  from "../assets/Images/twitter.svg";
import youtube  from "../assets/Images/youtube.svg";
const FooterLink2 = [
    {
      title: "Subjects",
      links: [
        { title: "Al", link: "/al" },
        { title: "Cloud Computing", link: "/cloud-computing" },
        { title: "Code Foundations", link: "/code-foundations" },
        { title: "Computer Science", link: "/computer-science" },
        { title: "Cybersecurity", link: "/cybersecurity" },
        { title: "Data Analytics", link: "/data-analytics" },
        { title: "Data Science", link: "/data-science" },
        { title: "Data Visualization", link: "/data-visualization" },
        { title: "Developer Tools", link: "/developer-tools" },
        { title: "DevOps", link: "/devops" },
        { title: "Game Development", link: "/game-development" },
        { title: "IT", link: "/it" },
        { title: "Machine Learning", link: "/machine-learning" },
        { title: "Math", link: "/math" },
        { title: "Mobile Development", link: "/mobile-development" },
        { title: "Web Design", link: "/web-design" },
        { title: "Web Development", link: "/web-development" },
      ],
    },
    {
      title: "Languages",
      links: [
        { title: "Bash", link: "/bash" },
        { title: "C++", link: "/c++" },
        { title: "C#", link: "/csharp" },
        { title: "Go", link: "/go" },
        { title: "HTML & CSS", link: "/html-css" },
        { title: "Java", link: "/java" },
        { title: "JavaScript", link: "/javascript" },
        { title: "Kotlin", link: "/kotlin" },
        { title: "PHP", link: "/php" },
        { title: "Python", link: "/python" },
        { title: "R", link: "/r" },
        { title: "Ruby", link: "/ruby" },
        { title: "SQL", link: "/sql" },
        { title: "Swift", link: "/swift" },
      ],
    },
    {
      title: "Career building",
      links: [
          {title: "Career paths", link: "/career-paths"},
          {title: "Career services", link: "/career-services"},
          {title: "Interview prep", link: "/interview-prep"},
          {title: "Professional certification", link: "/professional-certification"},
          {title: "-", link: "/hi"},
          {title: "Full Catalog", link: "/full-catalog"},
          {title: "Beta Content", link: "/beta-content"}
      ]
    }
  ];
  
const Footer = () => {
  return (
    <div>        
        <div className='flex relative flex-col gap-8'>
            <div className="flex flex-col lg:flex-row justify-center gap-[6rem] p-8 ">
                <div className="flex flex-wrap gap-16 items-start justify-between ">
                    <div  className="flex flex-col gap-4">
                        <div className="text-slate-400/80 text-2xl font-bold flex gap-2">DocSecure <span className='text-4xl text-green-400'><MdVerifiedUser/></span></div>
                        <div className="text-slate-400/80 font-bold">Company</div>
                        <Link className="text-slate-400/80">About</Link>
                        <Link className="text-slate-400/80">Careers</Link>
                        <Link className="text-slate-400/80">Affliates</Link>
                        <div className="flex gap-2">
                            <Link><img src={facebook}></img></Link>
                            <Link><img src={google}></img></Link>
                            <Link><img src={twitter}></img></Link>
                            <Link><img src={youtube}></img></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-slate-400/80 font-bold">Resources</div>
                        <Link className="text-slate-200/80">Article</Link>
                        <Link className="text-slate-200/80">Blog</Link>
                        <Link className="text-slate-200/80">Chart Sheet</Link>
                        <Link className="text-slate-200/80">Code Challenges</Link>
                        <Link className="text-slate-200/80">Docs</Link>
                        <Link className="text-slate-200/80">Projects</Link>
                        <Link className="text-slate-200/80">Videos</Link>
                        <Link className="text-slate-200/80">Workspaces</Link>
                        <div className="text-slate-400/80 font-bold">Support</div>
                        <Link className="text-slate-200/80">Help Center</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-slate-400/80 font-bold">Plans</div>
                        <Link className="text-slate-200/80">Paid memberships</Link>
                        <Link className="text-slate-200/80">For students</Link>
                        <Link className="text-slate-200/80">Business solutions</Link>
                        <div className="text-slate-400/80 font-bold">Community</div>
                        <Link className="text-slate-200/80">Forums</Link>
                        <Link className="text-slate-200/80">Chapters</Link>
                        <Link className="text-slate-200/80">Events</Link>
                    </div>
                </div>
                <div className="flex flex-wrap gap-16 items-start justify-between">
                {
                    FooterLink2.map((links, index)=>{  
                        return(<div key={index} className="flex flex-col gap-8 justify-between">
                            <div className="text-slate-400/80 font-bold relative cursor-pointer">{
                                links.title
                            }
                            </div>
                            <div className="flex flex-col justify-between gap-2">
                                {
                                    links.links.map((link)=>{
                                        return (
                                            <Link to={link.link} className="text-slate-200/80">{link.title}</Link>
                                        )
                                    })
                                }
                            </div>
                        </div>) 
                    })
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer