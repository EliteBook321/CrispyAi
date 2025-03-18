export default[
    
        {
            "name": "Blog Title Generator",
            "desc": "An AI tool that generates engaging blog titles based on niche & outline.",
            "category": "Blog",
            "icon": "https://cdn-icons-png.flaticon.com/128/4693/4693265.png",
            "slug": "generate-blog-title",
            "aiPrompt": "Give me 5 blog title ideas in bullet points based on the given niche & outline.",
            "form": [
                {
                    "label": "Enter your blog niche",
                    "field": "input",
                    "name": "niche",
                    "required": true
                },
                {
                    "label": "Enter blog outline",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "Blog Content Generator",
            "desc": "An AI tool that writes full-length blog posts based on a given topic & outline.",
            "category": "Blog",
            "icon": "https://cdn-icons-png.flaticon.com/128/9623/9623631.png",
            "slug": "generate-content",
            "aiPrompt": "Generate blog content based on topic and outline.",
            "form": [
                {
                    "label": "Enter your blog topic",
                    "field": "input",
                    "name": "topic",
                    "required": true
                },
                {
                    "label": "Enter blog outline",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "Blog Topic Ideas",
            "desc": "An AI tool that suggests 5 trending blog topics with outlines.",
            "category": "Blog",
            "icon": "https://cdn-icons-png.flaticon.com/128/18503/18503092.png",
            "slug": "blog-topic-ideas",
            "aiPrompt": "Generate top 5 blog topic ideas in bullet points with an outline.",
            "form": [
                {
                    "label": "Enter your niche",
                    "field": "input",
                    "name": "niche",
                    "required": true
                },
                {
                    "label": "Enter blog topic ideas",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "YouTube SEO Title Generator",
            "desc": "An AI tool that creates high-ranking SEO-optimized YouTube video titles.",
            "category": "YouTube Tools",
            "icon": "https://cdn-icons-png.flaticon.com/128/2522/2522649.png",
            "slug": "youtube-seo-title",
            "aiPrompt": "Give me the best SEO-optimized high-ranked 5 title ideas.",
            "form": [
                {
                    "label": "Enter your YouTube video topic keywords",
                    "field": "input",
                    "name": "topic",
                    "required": true
                },
                {
                    "label": "Enter YouTube description outline",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "YouTube Description Generator",
            "desc": "An AI tool that generates a 4-5 line engaging YouTube description with emojis.",
            "category": "YouTube Tools",
            "icon": "https://cdn-icons-png.flaticon.com/128/15302/15302398.png",
            "slug": "youtube-description",
            "aiPrompt": "Generate a YouTube description with emojis under 4-5 lines.",
            "form": [
                {
                    "label": "Enter your video title",
                    "field": "input",
                    "name": "topic",
                    "required": true
                },
                {
                    "label": "Enter YouTube outline",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "YouTube Tags Generator",
            "desc": "An AI tool that generates 10 optimized YouTube tags for better discoverability.",
            "category": "YouTube Tools",
            "icon": "https://cdn-icons-png.flaticon.com/128/10884/10884883.png",
            "slug": "youtube-tags",
            "aiPrompt": "Generate 10 YouTube tags in bullet points based on the title.",
            "form": [
                {
                    "label": "Enter your YouTube title",
                    "field": "input",
                    "name": "topic",
                    "required": true
                },
                {
                    "label": "Enter YouTube video outline (optional)",
                    "field": "textarea",
                    "name": "outline"
                }
            ]
        },
        {
            "name": "Instagram Caption Generator",
            "desc": "An AI tool that creates engaging, trendy captions based on a topic & mood.",
            "category": "Marketing & Social Media",
            "icon": "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
            "slug": "instagram-caption",
            "aiPrompt": "Generate an engaging Instagram caption based on the given topic & mood.",
            "form": [
                {
                    "label": "Enter your post topic",
                    "field": "input",
                    "name": "topic",
                    "required": true
                },
                {
                    "label": "Enter mood/tone (optional)",
                    "field": "input",
                    "name": "mood"
                }
            ]
        },
        {
            "name": "Twitter/X Thread Generator",
            "desc": "An AI tool that generates a thread of tweets based on a given topic.",
            "category": "Marketing & Social Media",
            "icon": "https://cdn-icons-png.flaticon.com/128/733/733579.png",
            "slug": "twitter-thread",
            "aiPrompt": "Generate a Twitter/X thread with multiple tweets on the given topic.",
            "form": [
                {
                    "label": "Enter your topic",
                    "field": "input",
                    "name": "topic",
                    "required": true
                }
            ]
        },
        {
            "name": "Ad Copy Generator",
            "desc": "An AI tool that writes high-converting ad copies for Google, Facebook & Instagram.",
            "category": "Marketing & Social Media",
            "icon": "https://cdn-icons-png.flaticon.com/128/929/929564.png",
            "slug": "ad-copy-generator",
            "aiPrompt": "Generate a compelling ad copy for Google, Facebook, and Instagram based on the given product/service.",
            "form": [
                {
                    "label": "Enter your product/service name",
                    "field": "input",
                    "name": "product",
                    "required": true
                },
                {
                    "label": "Enter key selling points",
                    "field": "textarea",
                    "name": "sellingPoints"
                }
            ]
        },
        {
            "name": "AI Translator",
            "desc": "An AI tool that translates content into multiple languages (English, Hindi, Tamil, Spanish, etc.).",
            "category": "AI-Powered Language & Communication",
            "icon": "https://cdn-icons-png.flaticon.com/128/2913/2913990.png",
            "slug": "ai-translator",
            "aiPrompt": "Translate the given text into multiple languages and according to the {text} entered.",
            "form": [
                {
                    "label": "Enter text to translate",
                    "field": "textarea",
                    "name": "text",
                    "required": true
                },
                
            ]
        },
        {
    "name": "AI Translator for Educational Content",
    "desc": "An AI tool that translates study materials, articles, and videos into multiple languages.",
    "category": "AI-Powered Language & Communication",
    "icon": "https://cdn-icons-png.flaticon.com/128/2913/2913990.png",
    "slug": "ai-educational-translator",
    "aiPrompt": "Translate this educational content into a selected language.",
    "form": [
        {
            "label": "Enter text to translate",
            "field": "textarea",
            "name": "text"
        },
        {
            "label": "Upload document (PDF, DOCX, TXT)",
            "field": "file",
            "name": "document"
        },
        {
            "label": "Select target language",
            "field": "dropdown",
            "name": "language",
            "options": ["English", "Hindi", "Tamil", "Spanish", "French", "German", "Chinese", "Japanese"],
            "required": true
        }
    ]
},

        
        {
            "name": "Speech-to-Text Converter",
            "desc": "An AI tool that converts spoken words into written text (useful for lectures & meetings).",
            "category": "AI-Powered Language & Communication",
            "icon": "https://cdn-icons-png.flaticon.com/128/3460/3460357.png",
            "slug": "speech-to-text",
            "aiPrompt": "Convert spoken words into written text.",
            "form": [
                {
                    "label": "Upload audio file",
                    "field": "file",
                    "name": "audio",
                    "required": true
                }
            ]
        },
    
    {
        name:'Industry Report Summarizer',
        desc:'Condense lengthy industry reports into key takeaways.',
        category:'Business',
        icon:'https://cdn-icons-png.flaticon.com/128/2953/2953912.png',
        slug:'industry-report',
        aiPrompt:'Summarize the following industry report with key trends and data insights.',
      
        form:[
            {
                label:'Paste industry report text',
                field:'textarea',
                name:'report',
                required:true
            }
        ]
    },
    
    {
        name:'Add emoji to Text',
        desc:'An AI tool that serves as your personal blog post title ',
        category:'blog ',
        icon:'https://image.shutterstock.com/image-vector/collection-connect-iconscontact-us-icon-260nw-2478970761.jpg',
        slug:'add-emoji-to-text',
        aiPrompt:'Add Emoji to outline text depends on outline and respond ',
       
        form:[
            {
                label:'Enter your youtube video topic keywords',
                field:'textarea',
                name:'outline',
                required:true
            },
            
        ]
    },
    {
        name:'Instagram Post Generator',
        desc:'An AI tool that serves as your personal blog post title ',
        category:'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/15047/15047534.png',
        slug:'instagram-post-generator',
        aiPrompt:'Give me best SEO optimized high ranked 5 title ideas ',
        
        form:[
            {
                label:'Enter keywords for your post',
                field:'input',
                name:'keyword',
                required:true
            },
            {
                label:'Enter youtube description outline here',
                field:'textarea',
                name:'outline'

            }
            
        ]
    },
    {
        name:'Instagram Hash Tag Generator',
        desc:'An AI tool that serves as your personal blog post title writer generating catchy and viral-worthy titles in your chosen language ',
        category:'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/15047/15047534.png',
        slug:'instagram-Hash-Tag-generator',
        aiPrompt:'Give me hashtag related to the keyword entered ',
        
        form:[
            {
                label:'Enter keywords for your post',
                field:'input',
                name:'keyword',
                required:true
            },
            
            
        ]
    },
    {
        name:'LinkedIn Post Ideas',
        desc:'Get AI-generated LinkedIn content ideas to grow your professional brand.',
        category:'Social Media',
        icon:'https://cdn-icons-png.flaticon.com/128/145/145807.png',
        slug:'linkedin-post',
        aiPrompt:'Suggest 5 LinkedIn post ideas for a {profession} to engage their audience.',
      
        form:[
            {
                label:'Enter your profession',
                field:'input',
                name:'profession',
                required:true
            }
        ]
    },
    {
        name:'Resume & Cover Letter AI',
        desc:'Generate professional resumes and cover letters instantly.',
        category:'Career',
        icon:'https://cdn-icons-png.flaticon.com/128/732/732084.png',
        slug:'resume-builder',
        aiPrompt:'Create a professional resume for a {job_title} role with key skills highlighted.',
      
        form:[
            {
                label:'Enter job title',
                field:'input',
                name:'job_title',
                required:true
            },
            {
                label:'Enter your experience (optional)',
                field:'textarea',
                name:'experience'
            }
        ]
    },
    {
        name:'AI Email Writer',
        desc:'Draft professional emails quickly with AI assistance.',
        category:'Business',
        icon:'https://cdn-icons-png.flaticon.com/128/3603/3603121.png',
        slug:'email-writer',
        aiPrompt:'Write a professional email for {context}.',
      
        form:[
            {
                label:'Enter email purpose',
                field:'textarea',
                name:'context',
                required:true
            }
        ]
    },
    {
        name:'Business Idea Generator',
        desc:'Generate new business ideas based on trends and market gaps.',
        category:'Business',
        icon:'https://cdn-icons-png.flaticon.com/128/6173/6173715.png',
        slug:'business-ideas',
        aiPrompt:'Suggest innovative business ideas in the {industry} sector.',
      
        form:[
            {
                label:'Enter industry or sector',
                field:'input',
                name:'industry',
                required:true
            }
        ]
    },
    {
        name:'Homework Solver',
        desc:'Solve and explain problems from math, science, or literature.',
        category:'Education',
        icon:'https://cdn-icons-png.flaticon.com/128/3515/3515333.png',
        slug:'homework-helper',
        aiPrompt:'Solve the given problem and explain the solution step by step.',
      
        form:[
            {
                label:'Enter your question or problem',
                field:'textarea',
                name:'problem',
                required:true
            }
        ]
    },
    {
        name:'Smart Notes Summarizer',
        desc:'Condense long lecture notes into key bullet points.',
        category:'Education',
        icon:'https://cdn-icons-png.flaticon.com/128/2271/2271091.png',
        slug:'notes-summarizer',
        aiPrompt:'Summarize the following lecture notes into concise bullet points.',
      
        form:[
            {
                label:'Paste lecture notes',
                field:'textarea',
                name:'notes',
                required:true
            }
        ]
    },
    {
        name:'MCQ Quiz Generator',
        desc:'Generate multiple-choice questions (MCQs) for exams or practice tests.',
        category:'Education',
        icon:'https://cdn-icons-png.flaticon.com/128/3135/3135706.png',
        slug:'mcq-generator',
        aiPrompt:'Generate 30 MCQs with answer options for the topic {topic}.',
      
        form:[
            {
                label:'Enter subject/topic for quiz',
                field:'input',
                name:'topic',
                required:true
            },
            {
                label:'Number of questions',
                field:'number',
                name:'num_questions',
                required:true
            }
        ]
    },
    {
        name:'Lesson Plan Generator',
        desc:'Create structured lesson plans with activities and objectives.',
        category:'Education',
        icon:'https://cdn-icons-png.flaticon.com/128/1048/1048929.png',
        slug:'lesson-plan',
        aiPrompt:'Generate a detailed lesson plan for {topic} including objectives, activities, and assessments.',
      
        form:[
            {
                label:'Enter subject or topic',
                field:'input',
                name:'topic',
                required:true
            }
        ]
    },
    {
        name:'Academic Research Assistant',
        desc:'Get research paper summaries, key takeaways, and citations.',
        category:'Education',
        icon:'https://cdn-icons-png.flaticon.com/128/2887/2887192.png',
        slug:'academic-research',
        aiPrompt:'Summarize the following research paper and provide key points.',
      
        form:[
            {
                label:'Paste research abstract or paper content',
                field:'textarea',
                name:'paper_content',
                required:true
            }
        ]
    },
        
    
    
    
    
            
]