export interface ProjectMedia {
  type: "image" | "video" | "youtube" | "spotify";
  /** For image/video: path relative to /public (e.g. "/projects/ai-podcast/demo.jpg")
   *  For youtube: the video ID (e.g. "dQw4w9WgXcQ")
   *  For spotify: the full Spotify URL (e.g. "https://open.spotify.com/show/...") */
  src: string;
  caption?: string;
}

export interface ProjectSection {
  heading: string;
  body: string | string[]; // string for paragraphs, string[] for bullet lists
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  tags: string[];
  github?: string;
  sections: ProjectSection[];
  media: ProjectMedia[];
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "robinhood-ai-portfolio",
    title: "Robinhood AI Portfolio Copilot",
    subtitle: "Full-Stack AI Investment Platform",
    tagline: "A production-grade AI copilot that connects to your brokerage, analyzes your holdings, and chats with you about your portfolio using Google Gemini 2.5 Flash.",
    tags: ["PydanticAI", "FastMCP", "Next.js 16", "FastAPI", "PostgreSQL", "Gemini 2.5 Flash", "Docker"],
    github: "https://github.com/BPrakhar30/Robinhood_AI_Portfolio_Analyzer",
    sections: [
      {
        heading: "Overview",
        body: "Robinhood AI Portfolio Copilot is a full-stack financial intelligence platform that connects to Robinhood via direct API or CSV import, aggregates your holdings and transaction history, and surfaces actionable insights through a conversational AI assistant backed by Google Gemini 2.5 Flash.",
      },
      {
        heading: "Core Features",
        body: [
          "Robinhood direct MFA connection (SMS, email, TOTP, push) and CSV import with auto-aggregation engine",
          "Portfolio Health Score (0-100) across diversification, concentration, ETF overlap, volatility (beta), and expense efficiency",
          "AI Portfolio Assistant with persistent multi-turn context, cross-session memory (25 facts), streaming SSE responses, and MCQ-based clarification",
          "Macro Pulse page covering 9 indicators (VIX, 10Y Treasury, CPI, S&P 500, DXY, PMI, HY Spreads, Oil, Baltic Dry)",
          "Markets page with AI-enriched news summaries, per-holding sentiment tags, and 11 RSS feed aggregation",
          "Stock detail view with interactive price chart (1D to MAX), earnings history, key stats, and AI chart interpretation",
          "Floating chat widget accessible from any page with page-aware suggested prompts",
          "Full auth: JWT sessions, bcrypt hashing, email OTP verification, account lockout, and password reset",
        ],
      },
      {
        heading: "AI and Agent Architecture",
        body: [
          "Agent Framework: PydanticAI with typed, schema-first agents and built-in tool calling and streaming",
          "LLM: Google Gemini 2.5 Flash via Google AI Studio free tier (provider-agnostic through PydanticAI)",
          "Tool Protocol: FastMCP (Model Context Protocol) over Streamable HTTP for process-level isolation",
          "10 portfolio tools exposed to the LLM - holdings, transactions, cash, performance, positions, profiles, quotes, stats, earnings, and candles",
          "Research sub-agent for S&P 500 screening, multi-stock fundamentals comparison, sector ranking, and DuckDuckGo web search",
          "Read-only by design: no write tools exposed, agent cannot place trades or mutate account state",
          "Observability: full-stack tracing via Pydantic Logfire (LLM calls, MCP tool calls, SQL queries, HTTP requests)",
        ],
      },
      {
        heading: "Tech Stack",
        body: [
          "Backend: Python, FastAPI, SQLAlchemy (async), Pydantic, JWT, bcrypt, Fernet encryption, slowapi",
          "Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, Recharts",
          "Database: PostgreSQL 16 with UUID primary keys, JSONB, and indexed foreign keys",
          "DevOps: Docker Compose with non-root containers and bind mounts for live reloading",
          "Data: Finnhub API, yfinance, robin_stocks, async RSS aggregation from CNBC, Reuters, Yahoo Finance, and more",
        ],
      },
      {
        heading: "Security",
        body: [
          "Rate limiting with slowapi (5/min register, 10/min login, 20/min AI queries)",
          "HTTP security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy",
          "Fernet encryption for broker tokens at rest with timing-safe token comparisons",
          "CORS tightened to explicit origins and methods; generic error responses with no stack traces",
          "Production startup guard refuses to start if secrets are defaults or debug mode is on",
        ],
      },
    ],
    media: [
      // Add your screenshots here once available:
      // { type: "image", src: "/projects/robinhood-ai-portfolio/dashboard.png", caption: "Portfolio Dashboard" },
      // { type: "youtube", src: "YOUR_YOUTUBE_VIDEO_ID", caption: "Full Demo" },
    ],
  },
  {
    slug: "ai-podcast",
    title: "End-to-End AI Generated Podcast",
    subtitle: "Generative AI Pipeline",
    tagline: "A fully automated pipeline that scrapes daily news, generates a podcast script using LLaMA 3 and GPT-4, and produces a final MP3 with AI voice cloning.",
    tags: ["LLaMA 3", "GPT-4", "TTS", "Voice Cloning", "Python", "Web Scraping"],
    github: "https://github.com/BPrakhar30/End-to-End_AI-Generated_Podcast",
    sections: [
      {
        heading: "Introduction",
        body: "The idea was to create an AI-generated podcast show where the news narrator could present daily news updates, invite guests to share their horror stories, and provide updates about the Olympics and sports. The next plan is to generate podcasts specifically for kids, where they can learn new things.",
      },
      {
        heading: "Pipeline",
        body: [
          "Scrape news from a base website using an in-house web scraper",
          "Convert news titles into queryable text and gather the top 5 results on each topic from different sources",
          "Summarize collected articles using LLaMA 3 (local) and GPT-4 API",
          "Generate a complete narration script with AI, including structured segments and transitions",
          "Convert the script to MP3 using a text-to-speech model with AI-generated intro and outro",
          "Assemble the final podcast episode and prepare for release",
        ],
      },
      {
        heading: "Key Technologies",
        body: [
          "LLaMA 3 running locally for script summarization and generation",
          "GPT-4 API for higher-fidelity script generation and quality control",
          "In-house web scraper with multi-source aggregation for comprehensive news coverage",
          "Text-to-speech model with voice cloning for a consistent, realistic narrator voice",
          "Automated MP3 assembly pipeline for complete episode production",
        ],
      },
    ],
    media: [
      { type: "spotify", src: "https://open.spotify.com/show/0jx7N6Uh2xErRfgseU0rjZ", caption: "Listen on Spotify" },
      { type: "image", src: "/projects/End-to-End-AI-Generated-Podcast/podcast.png", caption: "Episode Cover Image" },
    ],
  },
  {
    slug: "rag-chatbot",
    title: "RAG Chatbot",
    subtitle: "Retrieval-Augmented Generation System",
    tagline: "A RAG-based chatbot with LangChain, Llama 3, and Chroma vector DB — deployed as a Chrome extension for instant access on any webpage.",
    tags: ["RAG", "LangChain", "Llama 3", "Chroma DB", "OpenAI Embeddings", "Flask", "React"],
    github: "https://github.com/BPrakhar30/LLM_Stack",
    sections: [
      {
        heading: "Overview",
        body: "This project implements a full Retrieval-Augmented Generation (RAG) pipeline that allows users to chat with custom knowledge bases. It is deployed as a Chrome extension, making it accessible from any webpage without leaving the browser.",
      },
      {
        heading: "Architecture",
        body: [
          "Web scraping with BeautifulSoup for knowledge base ingestion",
          "Text preprocessing via stemming and lemmatization for NLP readiness",
          "Vector storage in Chroma DB using OpenAI Text-Embedding-3-Large model",
          "RAG pipeline built with LangChain stuff document chain and Llama 3",
          "Flask backend exposing RESTful endpoints for the extension",
          "React frontend embedded in the Chrome extension for seamless UX",
          "Few-shot and chain-of-thought prompting for improved answer quality",
        ],
      },
    ],
    media: [],
  },
  {
    slug: "self-learning",
    title: "Self-Learning AI System",
    subtitle: "Dynamic Object Recognition at Skylark Labs",
    tagline: "An AI system that can identify, label, and learn from new objects in real-time without human intervention — built for Skylark Labs.",
    tags: ["YOLOv8", "DreamSim", "BoT-SORT", "Swin Transformer", "PyTorch", "Computer Vision"],
    github: "https://github.com/BPrakhar30/Self_Learning",
    sections: [
      {
        heading: "Introduction",
        body: "This project represents a cutting-edge approach in AI-driven object recognition and self-learning systems. The primary objective is to enhance the accuracy of object identification and labeling in dynamic environments. The system is designed to self-identify, self-label, and self-learn from the environment, becoming increasingly efficient over time.",
      },
      {
        heading: "Methods",
        body: "The core of our method uses a detection model (YOLOv8) for accurately detecting objects within various frames. Once detected, DreamSim — a perceptual similarity model — analyzes and interprets the characteristics of each object. A specialized database of known objects is maintained, and a cosine similarity threshold determines when an object should be categorized as new. BoT-SORT tracks objects across frames and revises labels for accuracy.",
      },
      {
        heading: "Outcomes",
        body: [
          "Significant improvement in the system's ability to accurately recognize and label objects, especially in dynamic scenes",
          "More efficient use and updating of the object database, leading to better recognition of new objects",
          "Decrease in incorrect labeling frequency, particularly when objects are partially visible or exiting the frame",
          "40% boost in model accuracy through synthetic data generation",
          "30% enhancement in detection accuracy for fine objects using super-resolution techniques",
        ],
      },
      {
        heading: "My Contributions",
        body: [
          "Developed the self-labeling module — design and implementation of object recognition and labeling pipeline",
          "Integrated and optimized DreamSim for efficient feature extraction from detected objects",
          "Managed the database of known objects and fine-tuned cosine similarity thresholds for improved recognition",
          "Implemented BoT-SORT tracking for cross-frame object label revision and accuracy improvement",
          "Engineered synthetic data generation pipeline, increasing dataset diversity to drive 40% accuracy gain",
        ],
      },
    ],
    media: [
      { type: "youtube", src: "OFlqOgHWbqU", caption: "Self Learning Detection System" },
      { type: "youtube", src: "l3TIrdrO4-w", caption: "Self Learning Detection System" },
    ],
  },
  {
    slug: "3d-printing-defect",
    title: "3D Printing Defect Detection",
    subtitle: "Manufacturing Quality Control with Deep Learning",
    tagline: "An ensemble deep learning system to detect under-extrusion defects in 3D printing processes in real-time using transfer learning.",
    tags: ["PyTorch", "ResNet", "Transfer Learning", "Computer Vision", "Classification"],
    github: "https://github.com/BPrakhar30/Defect_Detection_3D_Printing_Issues",
    sections: [
      {
        heading: "Introduction",
        body: "In an era where manufacturing efficiency and precision are paramount, this project focused on early detection of 3D printing issues. The initiative was rooted in the social value of reducing material waste and enhancing the quality of 3D printed products. The objective was to develop a machine learning model capable of identifying under-extrusion defects — pivotal for maintaining the integrity of printed objects.",
      },
      {
        heading: "Dataset",
        body: "The dataset originated from seven different 3D printers, each contributing 6 to 20 individual prints. Snapshots were captured every 0.5 seconds by a nozzle-mounted camera. Every print was labeled as either successful or exhibiting under-extrusion symptoms. To prevent overfitting, data from two printers was reserved exclusively for testing, and several prints were withheld from training for validation. The dataset included train.csv and test.csv with columns for img_path, printer_id, print_id, and has_under_extrusion.",
      },
      {
        heading: "Methods",
        body: "Leveraging transfer learning, multiple deep learning architectures were deployed within PyTorch: ResNet18, ResNet34, AlexNet, VGG16, and GoogLeNet. Pre-trained models were fine-tuned on the 3D printing dataset to adapt them to under-extrusion detection. An ensemble approach combining the two best-performing models was then applied.",
      },
      {
        heading: "Results",
        body: [
          "Ensemble of ResNet18 and ResNet34 achieved the best performance with an F1 score of 0.71",
          "The ensemble method demonstrated a robust balance between precision and recall",
          "Transfer learning significantly reduced training time while maintaining competitive accuracy",
          "Model generalized well to unseen printers and print runs held out during training",
        ],
      },
    ],
    media: [
      { type: "image", src: "/projects/3D_Printing_Defect_Detection/accuracy.png", caption: "Accuracy vs Epochs Curve" },
     { type: "image", src: "/projects/3D_Printing_Defect_Detection/loss.png", caption: "Loss vs Epochs Convergence Curve" },
    ],
  },
  {
    slug: "neural-style-transfer",
    title: "Neural Style Transfer (GameStyler)",
    subtitle: "AI-Powered Game Visual Enhancement",
    tagline: "Applying the artistic essence of renowned paintings to video game interfaces using luminance-only neural style transfer.",
    tags: ["PyTorch", "VGG-19", "CLIP Loss", "CNN", "Style Transfer"],
    github: "https://github.com/BPrakhar30/Neural_Style_Transfer",
    sections: [
      {
        heading: "Introduction",
        body: "GameStyler was built to enhance the visual experience of video game interfaces. By integrating the artistic essence of renowned paintings into the gaming world, the goal was to elevate the aesthetic appeal and provide a unique gaming experience — blending fine art with entertainment without compromising gameplay.",
      },
      {
        heading: "Methods",
        body: "GameStyler uses Luminance-only Style Transfer, preserving the original colors of gameplay while infusing it with artistic styles. This overcomes common challenges like color loss and style incoherence. The approach employs a deep convolutional neural network leveraging patch-wise CLIP loss for style relevance and the VGG-19 network for semantic feature capture.",
      },
      {
        heading: "Results",
        body: [
          "Comprehensive comparisons with state-of-the-art style transfer models were conducted",
          "Quantitative assessments on loss metrics across numerous epochs validated the approach",
          "Qualitative analysis revealed striking visual enhancements in game interfaces",
          "Original gameplay integrity and interactivity were fully preserved",
        ],
      },
    ],
    media: [
      { type: "image", src: "/projects/GameStyler/loss.png", caption: "Loss vs Epochs Cruve"},
     { type: "image", src: "/projects/GameStyler/loss1.png", caption: "Loss vs Epochs Curve" },
     { type: "image", src: "/projects/GameStyler/flow.png", caption: "Example Output" },
    ],
  },
  {
    slug: "image-generation-gans",
    title: "Image Generation Using GANs",
    subtitle: "Deep Generative Modeling",
    tagline: "Training a DCGAN on the CelebA dataset to synthesize realistic human faces, exploring the dynamics of adversarial training.",
    tags: ["PyTorch", "DCGAN", "GAN", "CelebA", "Generative AI"],
    github: "https://github.com/BPrakhar30/Image_Generation_Using_GANs",
    sections: [
      {
        heading: "Overview",
        body: "This project uses Generative Adversarial Networks (GANs) to generate realistic images of human faces. The primary objective was to build and train a GAN model that could synthesize facial images convincingly using the CelebA dataset — a large-scale collection of celebrity faces.",
      },
      {
        heading: "Method",
        body: [
          "Used the CelebA dataset with 49,736 images loaded via PyTorch's Dataset tool",
          "Each image was resized to 3x128x128 pixels to optimize training time",
          "GAN architecture with a generator and discriminator network, both initialized with specific weights",
          "Trained using the Adam optimizer with Binary Cross Entropy loss over 350 epochs (~4 minutes per epoch)",
          "Used Python and PyTorch libraries for visualization and loss tracking",
        ],
      },
      {
        heading: "Outcomes",
        body: [
          "Successfully generated realistic facial images after 350 training epochs",
          "Loss-vs-iterations plots for both generator and discriminator provided insights into training dynamics",
          "Demonstrated the practical application of DCGANs for high-quality image synthesis",
        ],
      },
    ],
    media: [
     { type: "image", src: "/projects/Image-Generation-Using-GAN/loss.png", caption: "Training Loss vs Epochs Curve" },
    { type: "image", src: "/projects/Image-Generation-Using-GAN/output.png", caption: "Example Output" },
    ],
  },
  {
    slug: "structure-from-motion",
    title: "Instant3D: 3D Reconstruction with AI",
    subtitle: "Structure from Motion + Neural Radiance Fields",
    tagline: "Using smartphone cameras and AI upsampling to generate high-quality 3D models with same-day delivery — significantly faster than traditional methods.",
    tags: ["Structure from Motion", "NeRF", "Super-Resolution", "OpenCV", "3D Reconstruction"],
    github: "https://github.com/BPrakhar30/Structure_from_Motion",
    sections: [
      {
        heading: "Introduction",
        body: "Instant3D represents a transformative step in 3D reconstruction technology. It integrates advanced AI algorithms with accessible technology like smartphone cameras to overcome the limitations of traditional 3D reconstruction methods. A key innovation is the utilization of a hybrid attention transformer network for image upsampling, addressing the challenge of lower-resolution images typically captured by smartphones.",
      },
      {
        heading: "Methods",
        body: "The methodology leverages Structure from Motion (SfM) and Neural Radiance Fields (NeRF), combined with a hybrid attention transformer network for super-resolution. SfM extracts keypoints, matches features, and estimates camera matrices. The transformer upsamples low-res smartphone images before feeding them into the NeRF pipeline, significantly improving final model quality.",
      },
      {
        heading: "Performance",
        body: [
          "Same-day 3D model delivery — significantly outperforming traditional photogrammetry methods in speed",
          "Notable improvement in model accuracy and detail from the image upsampling step",
          "Cost-effective: uses standard smartphone cameras instead of specialized 3D scanning hardware",
        ],
      },
      {
        heading: "My Contributions",
        body: [
          "Camera calibration: precisely aligning and adjusting cameras for optimal data capture",
          "Dataset collection: gathering diverse images to provide a robust dataset for the pipeline",
          "Building the SfM pipeline: keypoint detection, feature matching, and camera matrix estimation",
          "Image upsampling: implementing the hybrid attention transformer network to upscale input images",
        ],
      },
    ],
    media: [
     { type: "image", src: "/projects/Instant3D/sfm.png", caption: "Illustrative Diagram Depicting the Detailed Process of Structure from Motion (SfM)"},
    {type: "image", src: "/projects/Instant3D/HD.png", caption: "High-Definition Transformation: Original 720p Image Upscaled to Crisp 3K Resolution"},
    {type: "image", src: "/projects/Instant3D/HD1.png", caption: "High-Definition Transformation: Original 480p Image Upscaled to Crisp 2K Resolution"},
  {type: "image", src: "/projects/Instant3D/comparison.png", caption: "Comparative Analysis: SfM Outputs with Standard vs. Super Resolution-Enhanced Images"},
  {type: "image", src: "/projects/Instant3D/comparison1.png", caption: "Comparative Analysis: SfM Outputs with Standard vs. Super Resolution-Enhanced Images"},
    ],
  },
  {
    slug: "foreign-object-debris",
    title: "Foreign Object Debris Detection",
    subtitle: "Aviation Safety at Skylark Labs",
    tagline: "An AI-powered FOD detection system for air stations, built in partnership with Skylark Labs and the Indian Navy to enhance aviation safety.",
    tags: ["YOLOv8", "Vision Transformer", "Super-Resolution", "Synthetic Data", "Computer Vision"],
    sections: [
      {
        heading: "Overview",
        body: "In aviation safety, managing Foreign Object Debris (FOD) on air stations is a pivotal challenge. Traditional FOD detection methods such as mechanical sweepers often fall short in efficiency. In partnership with Skylark Labs and the Indian Navy, an innovative FOD Detection System was developed to revolutionize FOD management and enhance the safety and operational readiness of aircraft.",
      },
      {
        heading: "Methods",
        body: [
          "Explored various architecture configurations integrating SOTA super-resolution models with detection and classification models",
          "Experimented with different dataset compositions, segmenting FODs into different class counts with a 'non-FOD' class to reduce false positives",
          "Created a synthetic dataset exceeding 80 GB with around 40,000 images covering diverse FOD types",
          "Ensured translational invariance and diverse lighting conditions: sunlight, overcast, rain, shadows, and water reflections",
        ],
      },
      {
        heading: "Outcomes",
        body: [
          "YOLOv8 and Vision Transformer models both demonstrated high FOD detection accuracy",
          "Vision Transformer showed particular proficiency in ignoring irrelevant objects, reducing false positives",
          "System significantly increased detection speed, enhancing air station operational efficiency",
          "Diverse synthetic datasets ensured model effectiveness across real-world environmental conditions",
        ],
      },
      {
        heading: "My Contributions",
        body: [
          "Explored and tested various model architecture combinations with super-resolution integration",
          "Developed a synthetic dataset generation pipeline simulating various lighting and weather conditions",
          "Built a translational invariant dataset pipeline for model robustness to FOD position variation",
          "Contributed to model robustness improvements that enabled real-world deployment readiness",
        ],
      },
    ],
    media: [
      { type: "youtube", src: "OKrfR5Pr5XE", caption: "Foreign Object Debris Detection Demo" },
      { type: "image", src: "/projects/Foreign-Object-Debris-Detection/output.png", caption: "Generated Synthetic Dataset Samples" },
    ],
  },
  {
    slug: "bert-fine-tuning",
    title: "BERT Fine-Tuning for Sentiment Analysis",
    subtitle: "NLP with Transformers",
    tagline: "Fine-tuned BERT-base-uncased on 1.6 million tweets achieving 87% accuracy and F1 score 0.85 on an NVIDIA RTX A6000 GPU.",
    tags: ["BERT", "PyTorch", "NLP", "Transformers", "Hugging Face", "Sentiment Analysis"],
    github: "https://github.com/BPrakhar30/Machine-Learning",
    sections: [
      {
        heading: "Overview",
        body: "A fine-tuning pipeline for BERT-base-uncased targeting sentiment analysis. The model was trained on the Sentiment140 dataset (1.6 million tweets) — a large-scale, real-world NLP benchmark with noisy labels from Twitter.",
      },
      {
        heading: "Methods",
        body: [
          "Added a classification head on top of BERT-base-uncased for binary sentiment classification",
          "Trained for 10 epochs on the Sentiment140 dataset on an NVIDIA RTX A6000 GPU",
          "Applied rule-based filtering to handle noisy labels inherent in Twitter data",
          "Addressed class imbalance using class weighting in the loss function",
          "Optimized batch size and learning rate for convergence stability",
        ],
      },
      {
        heading: "Results",
        body: [
          "Achieved 87% accuracy on the held-out test set",
          "F1 score of 0.85 indicating balanced precision and recall",
          "Class weighting successfully mitigated class imbalance effects",
          "Model generalized well to unseen tweets despite noisy training labels",
        ],
      },
    ],
    media: [],
  },
  {
    slug: "yt-summarizer",
    title: "YouTube Video Summarizer",
    subtitle: "LLM Application",
    tagline: "Application that summarizes any YouTube video using LLMs, with a React frontend and Python/FastAPI backend.",
    tags: ["LLM", "React", "Python", "FastAPI", "YouTube API"],
    github: "https://github.com/BPrakhar30/yt_video_summarizer_backend",
    sections: [
      {
        heading: "Overview",
        body: "A web application that lets users paste a YouTube URL and receive an AI-generated summary of the video content. The system uses the YouTube Transcript API to extract captions and sends them through an LLM pipeline for summarization.",
      },
      {
        heading: "Tech Stack",
        body: [
          "React frontend for clean user interface and URL input",
          "Python/FastAPI backend handling transcript extraction and LLM calls",
          "YouTube Transcript API for caption extraction",
          "LLM-powered summarization with configurable length and focus",
        ],
      },
    ],
    media: [
      {
        type: "youtube",
        src: "EFFhSLyFfPY",
        caption: "Demo: YouTube Video Summarizer in action",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}
