import React from 'react';
import './blog.css';
import Image from 'next/image';
import Link from 'next/link';

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">Discover Engaging Articles on Instagram, Explore Now!</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
      <div className="gpt3__blog-container_article">
                <div className="gpt3__blog-container_article-image">
                <Image src="/blog01.png" alt="blog_image" width={300} height={200} />
                </div>
                <div className="gpt3__blog-container_article-content">
                    <div>
                    <h3>How Instagram changed our world</h3>
                    </div>
                    <a href="https://www.theguardian.com/technology/2020/may/03/how-instagram-changed-our-world" target="_blank" rel="noopener noreferrer">
                        Read Full Article
                        </a>
                </div>
        </div>
      </div>
      <div className="gpt3__blog-container_groupB">
        <div className="gpt3__blog-container_article">
                <div className="gpt3__blog-container_article-image">    
                <Image src="/blog02.jpg" alt="blog_image" width={300} height={200} />
                </div>
                <div className="gpt3__blog-container_article-content">
                    <div>
                    <h3>Hidden Instagram Hacks & Features Everyone Should Know About</h3>
                    </div>
                    <a href="https://blog.hubspot.com/marketing/instagram-features-tricks" target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    </a>
                </div>
        </div>
        <div className="gpt3__blog-container_article">
                <div className="gpt3__blog-container_article-image">
                <Image src="/blog03.png" alt="blog_image" width={300} height={200} />
                </div>
                <div className="gpt3__blog-container_article-content">
                    <div>
                    <h3>How to Build Your Brand With Instagram: 4 Tried-and-True Tips</h3>
                    </div>
                    <a href="https://blog.hubspot.com/marketing/instagram-build-business-brand" target="_blank" rel="noopener noreferrer">
                        Read Full Article
                        </a>
                </div>
        </div>
        <div className="gpt3__blog-container_article">
                <div className="gpt3__blog-container_article-image">
                <Image src="/blog04.jpg" alt="blog_image" width={300} height={200} />
                </div>
                <div className="gpt3__blog-container_article-content">
                    <div>
                    <h3>5 Ways to Grow Your Instagram Following</h3>
                    </div>
                    <a href="https://www.shortstack.com/blog/5-instagram-articles-every-marketer-should-read" target="_blank" rel="noopener noreferrer">
                        Read Full Article
                        </a>
                </div>
        </div>
        <div className="gpt3__blog-container_article">
                <div className="gpt3__blog-container_article-image">
                <Image src="/blog05.jpg" alt="blog_image" width={300} height={200} />
                </div>
                <div className="gpt3__blog-container_article-content">
                    <div>
                    <h3>The 5 Best Free Instagram Analytics Tools</h3>
                    </div>
                    <a href="https://www.socialmediatoday.com/social-networks/peteschauer/2015-07-11/5-best-free-instagram-analytics-tools" target="_blank" rel="noopener noreferrer">
                        Read Full Article
                        </a>
                </div>
        </div>
      </div>
    </div>
  </div>
);

export default Blog;