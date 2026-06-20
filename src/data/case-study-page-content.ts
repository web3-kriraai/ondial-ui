export type CaseStudyCategory =
  | "realestate"
  | "healthcare"
  | "finance"
  | "retail"
  | "education"
  | "logistics"
  | "energy"
  | "manufacturing";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyRichDetail = {
  subtitle: string;
  readMinutes: number;
  domain?: string;
  scale?: string;
  overviewParagraphs: string[];
  industryContext: string[];
  problemParagraphs: string[];
  solutionParagraphs: string[];
  howItWorksSteps: string[];
  technicalSections: { title: string; paragraphs: string[] }[];
  techStack: { label: string; detail: string }[];
  resultsTable: { metric: string; before: string; after: string }[];
  resultHighlights: string[];
  resultsClosing: string;
  workflowSteps: { step: number; title: string; description: string }[];
  whatsNext: { title: string; paragraphs: string[] }[];
};

export type CaseStudyItem = {
  id: string;
  category: CaseStudyCategory;
  featured?: boolean;
  industry: string;
  industryBg: string;
  industryColor: string;
  company: string;
  location: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
  name: string;
  role: string;
  headline: string;
  quote: string;
  problem?: string;
  solution?: string;
  metrics: CaseStudyMetric[];
  tags: string[];
  richDetail?: CaseStudyRichDetail;
};

export const CASE_STUDY_PAGE_HERO = {
  tag: "Customer success stories",
  title: "Real businesses.",
  titleHighlight: "Real results with OnDial.",
  description:
    "See how companies across 20+ industries use OnDial's AI voice call automation to reduce costs, qualify more leads, and deliver better customer experiences — at scale.",
  primaryCta: "Watch a demo",
  secondaryCta: "Read all stories",
  stats: [
    { value: "500+", label: "Businesses using OnDial" },
    { value: "20+", label: "Industries covered" },
    { value: "10M+", label: "Calls automated" },
    { value: "4.9★", label: "Average CSAT score" },
  ],
} as const;

export const CASE_STUDY_STORIES = {
  title: "Browse stories by industry",
  subtitle:
    "Every business answers the phone differently. See how teams like yours put OnDial to work.",
} as const;

export const CASE_STUDY_TICKER = [
  "Call answered in 2 rings — Prestige Realty",
  "Lead qualified in 38s — QuickLoan Finance",
  "Appointment booked — Apollo Clinics Group",
  "After-hours call captured — StyleCart",
  "Delivery update sent — SwiftMove Logistics",
  "Enrolment confirmed — NextGen Academy",
  "Payment reminder handled — QuickLoan Finance",
  "Viewing booked — Prestige Realty",
] as const;

export type CaseStudyQuoteItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
};

export const CASE_STUDY_FILTERS: { id: "all" | CaseStudyCategory; label: string }[] = [
  { id: "all", label: "All stories" },
  { id: "realestate", label: "Real estate" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "retail", label: "Retail" },
  { id: "education", label: "Education" },
  { id: "logistics", label: "Logistics" },
  { id: "energy", label: "Energy" },
  { id: "manufacturing", label: "Manufacturing" },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "edu-textbook-qa",
    category: "education",
    featured: true,
    industry: "Education",
    industryBg: "#FAEEDA",
    industryColor: "#633806",
    company: "National Curriculum Press",
    location: "India",
    avatar: "NC",
    avatarBg: "#FAEEDA",
    avatarColor: "#633806",
    name: "Editorial Operations Team",
    role: "Quality assurance lead",
    headline:
      "Educational textbook quality assurance automation — review cycle cut from 3 weeks to 15 minutes",
    quote:
      "Seven parallel audit checks now replace a full editorial team's sequential manuscript review, at 75–80% lower labor cost — without removing human judgment, only moving it to where it actually matters.",
    problem:
      "Sequential manual review of 300-page manuscripts took 2–3 weeks per title, with a 10–15% minor defect miss rate that compounded across simultaneous releases.",
    solution:
      "A parallel seven-axis audit system with pedagogical context injection, completing full manuscript review in 10–15 minutes across grammar, semantics, layout, media, continuity, compliance, and originality checks.",
    metrics: [
      { value: "99%+", label: "Review cycle reduction" },
      { value: "75–80%", label: "Lower labor cost" },
      { value: "<1%", label: "Defect miss rate" },
    ],
    tags: [
      "Grammar & punctuation",
      "Curriculum compliance",
      "Layout integrity",
      "Cross-chapter continuity",
      "Format-preserving export",
      "Parallel audit pipeline",
    ],
    richDetail: {
      subtitle:
        "Seven parallel audit checks now replace a full editorial team's sequential manuscript review, at 75–80% lower labor cost.",
      readMinutes: 12,
      domain: "Textbook editorial quality assurance and compliance review",
      scale:
        "Full 300–400 page textbooks across grammar, semantics, layout, media, continuity, compliance, and originality checks",
      overviewParagraphs: [
        "The thing every educational publisher knows but rarely says aloud: your most expensive editorial specialists spend most of their time doing work that fatigue makes unreliable. The automated textbook audit described here cut the standard 2–3 week review cycle to under 15 minutes per manuscript — not by removing human judgment, but by moving it to where it actually matters.",
        "What changed wasn't the number of checks performed; it was that seven of them now run simultaneously across every chapter, before a single editor opens the file. The result is worth examining closely, because how it was built determines whether it could work at your scale.",
      ],
      industryContext: [
        "The educational publishing sector is larger and more operationally complex than most people outside it realise. Tens of thousands of textbook titles are produced or revised annually across national and regional curricula — with print runs in the millions, shelf lives of five to ten years, and quality assurance requirements that span language accuracy, factual correctness, layout integrity, visual coherence, curriculum alignment, and bias compliance, all in the same document.",
        "A single 300-page title passes through subject matter experts, language editors, layout designers, and compliance auditors before it reaches a classroom, each specialist working sequentially, each touching a different layer of the same file. The cost of getting it wrong is not abstract: a factual error in a science textbook prints in millions of copies across an entire academic year.",
        "The industry's standard review model was designed for a world where a publisher released a handful of titles per year. What's now breaking it is the convergence of accelerated curriculum revision cycles, digital-first delivery removing print lead-time buffers, and compliance frameworks that require verifiable, auditable output. AI editorial review for educational publishers isn't a convenience at this point — it's a capacity problem.",
      ],
      problemParagraphs: [
        "Any editorial team that reviews textbooks professionally recognises the same weekly reality: a 300-page manuscript arrives, a team of four to six people divides it by chapter, and the next two to three weeks are consumed by a process that is simultaneously exhausting and structurally fragile. Grammar editors catch what they catch on page 40, but no individual holds the full manuscript in working memory — so the contradiction on page 180, where a diagram quietly disagrees with text written three chapters earlier, survives.",
        "Layout errors discovered late require coordinating changes across the source file and the formatted PDF, a handoff that routinely breaks fonts, shifts columns, and displaces captions. The design team then spends additional days fixing what the editorial correction introduced. This is not a process that occasionally goes wrong. This is the process working as designed.",
        "A 10 to 15 percent minor defect miss rate across a 400-page manuscript is not a failure of individual editors — it is the predictable output of a cognitive load that exceeds human working memory at scale. Errors that reach print create correction costs, potential reprints, regulatory exposure, and damage to the publisher's standing with curriculum boards.",
        "The structural limitation is that the process is fundamentally sequential: each specialist hands their work to the next, and the whole review is only as fast as the sum of its parts. A publisher managing ten simultaneous manuscript revisions has a permanently stacked calendar where every new submission displaces something already in progress.",
      ],
      solutionParagraphs: [
        "The first architectural decision was to reject the tool category entirely. Existing automated grammar checkers process text sequentially and return a single result set at the end — with no mechanism to know whether they're reviewing a Grade 3 geography workbook or a Grade 11 physics reference.",
        "We built a system that splits the document into chapter units before any analysis begins, establishes pedagogical context before any check runs, and executes all seven quality dimensions simultaneously across all chapters rather than in sequence.",
        "An editor who previously spent two weeks working through a manuscript now opens a completed audit in the time it takes to have a morning standup. Every chapter has already been checked for grammar, factual accuracy, layout integrity, illustration relevance, cross-chapter continuity, curriculum compliance, and originality — in parallel, against the specific pedagogical context of that chapter.",
        "The custom engineering that determined the outcome was the pedagogical context pass — a vision analysis step that runs before any audit pipeline executes. The context pass creates a structured pedagogical summary for each chapter and injects it as a parameter into every downstream check.",
        "The system exports corrections directly into structured word processing files with layout preserved, or embeds annotation overlays onto PDF pages — whichever format the editor was already working in. By applying corrections at the document's XML structural level, the system produces clean, print-ready output that requires no additional design polishing.",
      ],
      howItWorksSteps: [
        "Manuscript upload",
        "Chapter boundary detection",
        "Pedagogical context pass",
        "Seven parallel quality audits",
        "Results merged and streamed to editor UI",
        "Corrected document exported with layout intact",
        "Review cycle completed in 15 minutes",
      ],
      technicalSections: [
        {
          title: "Chapter boundary segmentation engine",
          paragraphs: [
            "The system cannot process a 400-page textbook as a single input — doing so destroys the structural information needed to run meaningful parallel audits. The segmentation engine identifies chapter boundaries using vision model analysis of table-of-contents images and cognitive layout boundary detection that identifies major heading structures and page transitions.",
            "Both methods return chapter start pages and titles without requiring the uploader to pre-structure or tag the document. This segmentation step is what enables every downstream operation to process chapter units in parallel.",
          ],
        },
        {
          title: "Pedagogical context pass",
          paragraphs: [
            "Before any of the seven quality pipelines execute, a vision model inspects each chapter's visual layout and returns a structured summary: target grade level, subject domain, pedagogical style, and curriculum focus. This summary is injected as a fixed parameter into every downstream audit prompt.",
            "Running context detection inside each of seven parallel pipelines would produce seven slightly different context interpretations. A single authoritative context pass, run once per chapter, ensures all seven audits are anchored to the same pedagogical frame.",
          ],
        },
        {
          title: "Parallel seven-axis audit execution",
          paragraphs: [
            "The seven quality pipelines — grammar and punctuation, factual and logical accuracy, layout integrity, illustration relevance, cross-chapter continuity, curriculum compliance and bias, and originality — run simultaneously across all chapter segments.",
            "Each pipeline receives the chapter text or page images plus the pedagogical context summary and returns structured JSON results. A rotating key pool distributes load across multiple credentials, with automatic fallback to secondary models on consecutive failures.",
          ],
        },
        {
          title: "Concurrency state management",
          paragraphs: [
            "When dozens of parallel processes finish at different times and all write to the same task record, write collisions are a near-certainty without explicit coordination. The system manages this through a two-tier state architecture: a fast in-memory cache holds transient semaphores and lock vectors, while a relational database holds the durable task record.",
          ],
        },
        {
          title: "XML-level format-preserving correction",
          paragraphs: [
            "When the system identifies a correction, it applies that correction directly to the document's XML structure, mapping the change to the precise formatting node in the source file rather than annotating a rendered output layer. This produces a corrected source file that requires no additional design work — the distinction that makes automated manuscript proofreading workflows viable at scale.",
          ],
        },
        {
          title: "Real-time result streaming",
          paragraphs: [
            "Rather than holding all results until the full manuscript audit completes, the system streams chapter results to the editor interface as each chapter-pipeline batch finishes. An editor reviewing a 400-page textbook starts seeing results for Chapter 1 within the first few minutes of upload, rather than waiting 15 minutes for the full document to complete.",
          ],
        },
      ],
      techStack: [
        {
          label: "Data ingestion",
          detail:
            "Direct client-to-cloud signed URL upload — large textbooks write directly to object storage without transiting the application server.",
        },
        {
          label: "Processing framework",
          detail:
            "Asynchronous web router with cooperative task scheduling — supports hundreds of simultaneous chapter workers without proportional thread overhead.",
        },
        {
          label: "State layer",
          detail:
            "In-memory key-value cache for transient semaphores and lock vectors — keeps backend servers stateless and enables horizontal scaling.",
        },
        {
          label: "Persistence",
          detail:
            "Asynchronous relational database for user authentication, audit history, task records, and compliance trails.",
        },
        {
          label: "Model layer",
          detail:
            "Multimodal vision-language model pool with rotating credentials and fallback routing across providers.",
        },
        {
          label: "Real-time delivery",
          detail:
            "Server-Sent Events streaming — unidirectional push from server to client with simpler reconnection semantics than WebSockets.",
        },
        {
          label: "Document translation",
          detail:
            "Cloud-integrated PDF-to-document structure extraction — maps text back to source formatting nodes.",
        },
        {
          label: "Output compilation",
          detail:
            "Headless document renderer and vector markup generator — compiles corrected source documents to print-ready PDF.",
        },
      ],
      resultsTable: [
        {
          metric: "Audit cycle duration",
          before: "10–15 business days",
          after: "10–15 minutes",
        },
        {
          metric: "Labor cost per textbook",
          before: "Team of 4–6 specialists, sequential",
          after: "One editor reviewing pre-flagged issues",
        },
        {
          metric: "Labor cost reduction",
          before: "Baseline team cost",
          after: "75–80% per textbook",
        },
        {
          metric: "Defect miss rate",
          before: "10–15%",
          after: "<1%",
        },
        {
          metric: "Format integrity",
          before: "Manual re-styling after corrections",
          after: "Zero style degradation; no design rework",
        },
        {
          metric: "Compliance auditing",
          before: "Subjective, variable by reviewer",
          after: "Objective, auditable, consistent across titles",
        },
      ],
      resultHighlights: [
        "Review cycle reduced by 99%+ — a publisher running 20 simultaneous manuscript revisions can now process all of them in a single working day.",
        "Labor cost per textbook review fell 75–80% — the editorial function shifts from six people hunting for errors across two weeks to one person reviewing flagged issues across a morning.",
        "Defect miss rate fell from 10–15% to under 1% — cross-chapter fact contradictions, displaced captions, and missed compliance flags are surfaced before any human review begins.",
        "Format destruction during corrections eliminated — corrections apply at the XML structural level, removing the additional round of design polishing that followed every manual editorial pass.",
      ],
      resultsClosing:
        "A publisher who previously had to choose between thorough review and fast release now faces neither constraint. Compliance verification runs in parallel with everything else and completes before the first editor opens the file — shifting from assurance-by-process to assurance-by-record.",
      workflowSteps: [
        {
          step: 1,
          title: "Editorial failure mode mapping",
          description:
            "We documented the specific failure modes of manual textbook review — which defects are caught early, which survive to later stages, and which reach print because they fall between specialist responsibilities.",
        },
        {
          step: 2,
          title: "Parallel architecture and context injection design",
          description:
            "The two foundational decisions — parallel multi-axis auditing and pre-audit pedagogical context injection — were locked before any code was written. Sequential and context-free approaches were evaluated and rejected on throughput and quality grounds.",
        },
        {
          step: 3,
          title: "Segmentation and context pipeline build",
          description:
            "The chapter segmentation engine and pedagogical context pass were built and validated before the seven audit pipelines were connected — tested against manuscripts with inconsistent chapter formatting and missing tables of contents.",
        },
        {
          step: 4,
          title: "Parallel audit validation and concurrency testing",
          description:
            "Each of the seven audit pipelines was validated individually before parallel execution was enabled. Concurrency testing targeted the write-lock coordination layer under induced simultaneous chapter completions.",
        },
        {
          step: 5,
          title: "Format-preserving output and editor workflow integration",
          description:
            "The final phase connected audit results to XML-level correction application, PDF annotation overlays, and complex-script proofing sheets — designed around the existing review workflow to ensure adoption without retraining.",
        },
      ],
      whatsNext: [
        {
          title: "Cross-title curriculum coherence",
          paragraphs: [
            "The audit capability creates the foundation for cross-title curriculum coherence — ensuring terminology, conceptual framing, and factual claims are consistent across an entire Grade 5 science series, not just within each book.",
            "Extending the coordination layer to span multiple documents in a series requires connecting the same pipeline across a set of task records rather than a single one — an architectural extension, not a rebuild.",
          ],
        },
        {
          title: "Native design file support",
          paragraphs: [
            "The system now accepts Adobe InDesign files directly as input and returns a corrected InDesign file as output — corrections applied at the source layer designers actually work in.",
            "For publishers whose designers work natively in InDesign, this closes the loop entirely: an approved audit passes straight back to the production file without a human translation step.",
          ],
        },
        {
          title: "Real-time review during authoring",
          paragraphs: [
            "The same pipeline — context pass, parallel audits, structured results — can run incrementally on a chapter as it is written, returning feedback to the author before the manuscript reaches the editorial team.",
            "The broader signal: not replacing specialist judgment, but ensuring that when specialists exercise judgment, they are looking at pre-verified, pre-flagged, context-aware material.",
          ],
        },
      ],
    },
  },
  {
    id: "solar-photo-verification",
    category: "energy",
    featured: true,
    industry: "Energy",
    industryBg: "#FFF4E6",
    industryColor: "#B45309",
    company: "State Solar Infrastructure Program",
    location: "India",
    avatar: "SS",
    avatarBg: "#FFF4E6",
    avatarColor: "#B45309",
    name: "Program Compliance Team",
    role: "Field verification lead",
    headline:
      "Solar installation photo verification automation — from 14-day backlogs to 3-second verdicts",
    quote:
      "Automated solar site verification that reduced approval time from days to seconds with offline edge AI did not just accelerate a slow process. It closed fraud vectors that no amount of additional headcount could have addressed.",
    problem:
      "Human reviewers cannot detect pixel-level image splicing or cross-regional duplicate submissions at scale, creating fraud exposure and multi-week approval backlogs across thousands of field submissions.",
    solution:
      "An offline edge system that runs pixel forensics, OCR, and object detection locally, producing a structured verdict in under 3 seconds with zero sensitive data sent to external networks.",
    metrics: [
      { value: "<3 sec", label: "Verification cycle time" },
      { value: "403,200×", label: "Maximum cycle reduction" },
      { value: "Zero", label: "External data exposure" },
    ],
    tags: [
      "Pixel-level fraud detection",
      "Offline edge AI",
      "Dual-pass OCR",
      "Duplicate submission matching",
      "Regional format validation",
      "Forensic audit trail",
    ],
    richDetail: {
      subtitle:
        "Replacing manual field photo audits with offline edge AI that detects pixel-level fraud no human reviewer can see.",
      readMinutes: 14,
      domain: "Field installation verification and disbursement compliance",
      scale:
        "Thousands of field submissions across multiple state regions with varying regulatory formats",
      overviewParagraphs: [
        "State solar programs have a fraud problem that manual review cannot solve, and most program administrators know it. The core issue is not that reviewers are inattentive — it is that pixel-level image splicing and cross-regional duplicate submissions are invisible to the human eye regardless of how experienced the reviewer is.",
        "This case study documents how we built an offline-first edge system that performs multi-dimensional visual verification on field photographs — detecting solar asset presence, operator attendance, hardware compliance, and pixel-level tampering — without sending a single byte of sensitive data to an external network. What solved the problem was not faster review. It was building a system that can perceive things human reviewers cannot.",
      ],
      industryContext: [
        "Large-scale solar infrastructure programs operate at a verification throughput that the existing audit model was never designed to handle. A state program processing tens of thousands of field submissions annually relies on human reviewers to perform solar installation photo verification one record at a time: read the GPS stamp, confirm the coordinates fall inside the permitted boundary, verify panels are visible, check for a present operator or beneficiary, validate accessory compliance, and cross-reference the application number against the regional format template.",
        "Each check is straightforward in isolation. At program scale — with daily submission volumes numbering in the hundreds and disbursements legally tied to the completion of every check — the manual approach creates backlogs measured in weeks, not days, and error rates that climb as reviewer fatigue accumulates. The real cost of getting it wrong is not just delayed payment to a legitimate installation. It is approved disbursement to a fraudulent one, and no recovery mechanism once funds have cleared.",
        "The standard approach held for a long time because volume was contained. When programs processed hundreds of submissions per quarter, manual review was slow but manageable. The structural shift that exposed its limits was growth: as deployment targets scaled and submission volumes multiplied, field inspection image fraud detection became the bottleneck that defined the whole program's throughput ceiling.",
      ],
      problemParagraphs: [
        "Every working day inside these programs, an audit team opens a queue of field photographs and begins a sequence that has not changed in years. For a single submission, the manual review process takes several minutes: read the GPS coordinates burned into the image, verify they fall within the permitted state boundary, confirm solar panels are visible and appear active, check that an operator or beneficiary is present in the frame, scan for required accessories, compare the application number format against the regional template, and flag the image for duplicate review against every prior submission.",
        "Multiply this by hundreds of daily submissions and the arithmetic is straightforward: the queue grows faster than it clears, and approvals that should take hours take weeks. Delayed approvals meant delayed disbursements to legitimate installations, which created financial strain for installers operating on thin margins and reputational exposure for the administering program.",
        "The fundamental problem was not that reviewers were slow. It was that the human visual system cannot do what forensic verification requires. A reviewer staring at a photograph with a cloned solar panel region sees a photograph. There is no visible seam, no obvious artifact, no signal available to the naked eye. The same is true of duplicate submissions routed across state boundaries: a photograph submitted in one region and resubmitted in another to claim a second installation looks identical to a legitimate submission because it is the same image.",
        "What made acting non-negotiable was the realisation that these fraud vectors were not edge cases — they were vectors that would scale with the program. Detection requires forensic analysis at the pixel level — anomaly scoring against regions of interest, perceptual hash matching across a full submission registry, and exclusion logic sophisticated enough to distinguish benign camera overlays from genuine structural fraud.",
      ],
      solutionParagraphs: [
        "The first decision — and the one that determined every subsequent architectural choice — was to reject cloud processing. Field photographs contain operator biometrics, precise GPS telemetry, and beneficiary identification data. Submitting them to an external inference service would expose this data to networks outside program control, violating data privacy mandates that several state programs operate under.",
        "What the system now makes possible is a complete verification cycle that no human process could match in speed or detection coverage. A field inspector submits a photograph to the local interface. Within three seconds, the system has confirmed whether active solar panels are present and positioned correctly, whether an operator or beneficiary is physically in the frame, whether required accessories pass the current compliance specification for that state region, whether the GPS coordinates fall within the permitted boundary, whether the application number matches the regional format template, and whether the photograph passes pixel-level forensic review for splicing and cross-application duplicate matching.",
        "Two components required custom engineering that no off-the-shelf system could have provided. The first was the ROI tamper gating pipeline — a multi-step exclusion pipeline that detects metadata banner regions using edge-density heuristics and text bounding box positions, constructs a dynamic exclusion mask, and runs pixel anomaly scoring only across the raw regions of interest after the mask is subtracted.",
        "The second was the dual-pass OCR engine that runs Latin and regional script families in parallel, merges detections spatially using confidence heuristics, and feeds combined output to a locally deployed language model using runtime-reloaded regional parsing templates. The system integrates into the existing workflow at the submission point, replacing the moment a reviewer would open a photograph for manual inspection.",
      ],
      howItWorksSteps: [
        "Field photo submission",
        "Normalisation and scaling",
        "Parallel visual analysis: panel detection, person detection, clarity scoring, tamper forensics",
        "Sequential accessory identification",
        "Dual-pass OCR with regional script merge",
        "Edge LLM field extraction with grounding check",
        "ROI anomaly filtering against exclusion mask",
        "Structured verdict with annotated proof",
        "Disbursement decision and audit trail",
      ],
      technicalSections: [
        {
          title: "Dynamic exclusion mask for tamper gating",
          paragraphs: [
            "Standard pixel anomaly models compute a modification probability across the full image frame and report any region where the pixel distribution deviates from the expected noise floor. Applied to field photographs, this produces false positives on every GPS banner and timestamp overlay — which appear on virtually every authentic submission.",
            "The exclusion mask pipeline solves this by building a spatial map of benign overlay regions before the forensic pass runs, using edge-density heuristics to detect rectangular metadata banners and text bounding box positions from the OCR stage to identify watermark zones. The anomaly analyzer evaluates only the pixel regions that remain after subtracting this mask.",
          ],
        },
        {
          title: "Dual-pass multilingual OCR engine",
          paragraphs: [
            "Field photographs capture text that mixes Latin characters with regional scripts, at varying angles, distances, and lighting conditions. A single-pass OCR engine tuned for one character family produces garbled output on mixed-script frames.",
            "The dual-pass architecture runs separate Latin and regional script recognisers in parallel, merging their outputs spatially using bounding box overlap and per-region confidence scoring. Text regions where both passes return a detection use the higher-confidence reading.",
          ],
        },
        {
          title: "Edge-deployed language model for field extraction",
          paragraphs: [
            "Raw OCR output from field photographs is noisy, unstructured, and mixed with background text that is not part of the data record. Extracting validated fields — latitude, longitude, application number, beneficiary name — requires a model that understands the regional layout and format rules that govern how this data appears in stamps.",
            "The language model runs locally with no external inference calls, using runtime-reloaded regional configuration templates that define the parsing rules for each state's format. A grounding pass verifies every extracted field against the raw OCR blocks before the field is written to the verdict.",
          ],
        },
        {
          title: "Semantic segmentation for asset presence verification",
          paragraphs: [
            "Confirming that active solar panels are physically installed and correctly positioned requires isolating the panel region within the image and computing spatial coverage metrics. The segmentation model identifies and outlines solar array components, produces coordinate and area outputs for each detected region, and confirms whether the detected configuration meets the presence threshold for that submission type.",
            "Open-vocabulary segmentation was chosen over a fixed-class object detector for accessory identification because the set of required accessories varies across deployment configurations and changes over program lifecycles.",
          ],
        },
        {
          title: "Cross-application duplicate registry",
          paragraphs: [
            "A photograph submitted in one state region and resubmitted in another to claim a second disbursement is indistinguishable from a legitimate submission by visual inspection. Duplicate detection operates against a secure local registry of perceptual image signatures accumulated across all prior submissions.",
            "The match runs at submission time, before any downstream processing, and produces a duplicate flag that routes the submission to immediate rejection with evidence. The registry grows with every approved submission and requires no external synchronisation.",
          ],
        },
        {
          title: "Hybrid execution architecture for workstation hardware",
          paragraphs: [
            "Running semantic segmentation, dual-pass OCR, pixel forensics, and language model inference simultaneously on workstation-class hardware creates memory pressure that causes out-of-memory crashes on naive parallel implementations.",
            "The hybrid execution architecture separates tasks into two tiers: lightweight, non-interfering tasks run concurrently through a thread-pool executor, while high-memory models are queued sequentially with explicit GPU cache reclamation and garbage collection between phases.",
          ],
        },
      ],
      techStack: [
        {
          label: "Offline-first edge execution",
          detail:
            "All model weights loaded from local storage at startup with library update channels locked — cloud inference would expose biometrics and GPS telemetry to external networks.",
        },
        {
          label: "Pixel anomaly detection with ROI gating",
          detail:
            "Forensic modification scoring applied after dynamic exclusion mask subtraction — benign camera overlays on authentic submissions produce false positives that make full-frame scoring unusable in production.",
        },
        {
          label: "Dual-pass OCR with confidence merge",
          detail:
            "Parallel Latin and regional script recognisers with spatial overlap merging — independent per-family tuning required to reach accuracy threshold on mixed-script field photographs.",
        },
        {
          label: "Locally deployed language model",
          detail:
            "Edge inference for structured field extraction with runtime-reloaded regional templates — eliminates external round-trips and keeps parsing logic updatable without code deployments.",
        },
        {
          label: "Open-vocabulary segmentation",
          detail:
            "Text-prompt-driven accessory identification at inference time — required accessory categories change across program versions without retraining cycles.",
        },
        {
          label: "Perceptual hash duplicate registry",
          detail:
            "Image signature matching against full prior submission history at submission time — a resubmitted photograph carries no metadata that identifies it as a duplicate, only its pixel content does.",
        },
        {
          label: "Hybrid thread-pool and sequential executor",
          detail:
            "Concurrent lightweight tasks with sequentially queued high-memory models and explicit cache reclamation — prevents out-of-memory crashes on workstation VRAM budgets.",
        },
        {
          label: "Dual API representation",
          detail:
            "Separate internal telemetry endpoint and filtered public endpoint — prevents forensic evidence detail from leaking through downstream enterprise integrations.",
        },
      ],
      resultsTable: [
        {
          metric: "Verification cycle time",
          before: "Up to 14 business days",
          after: "Under 3 seconds",
        },
        {
          metric: "Maximum cycle time reduction",
          before: "14-day queue backlog",
          after: "403,200× faster (derived)",
        },
        {
          metric: "Offline operational status",
          before: "Network-dependent review",
          after: "100% offline capable",
        },
        {
          metric: "External PII exposure",
          before: "Data transits review systems",
          after: "Zero bytes sent externally",
        },
        {
          metric: "Pixel-level splicing detection",
          before: "Not possible via human review",
          after: "100% of submissions screened",
        },
        {
          metric: "Regional format validation",
          before: "Reviewer interpretation",
          after: "Deterministic template matching",
        },
      ],
      resultHighlights: [
        "Verification cycle reduced by up to 403,200× (derived) — what previously required up to 14 business days of queue time now resolves in under three seconds, meaning a field inspector can receive a confirmation verdict before driving to the next site.",
        "Pixel-level splicing detection deployed across 100% of submissions — a fraud vector that was entirely invisible to human review is now screened on every photograph at submission time, with no increase in reviewer workload.",
        "Cross-application duplicate detection operational in real time — photographs submitted across multiple regional applications are matched against the full submission registry at the moment of upload, before any processing occurs.",
        "Zero external data exposure — all biometric data, GPS telemetry, and beneficiary identification remain on local infrastructure, satisfying privacy mandates that previously forced programs to choose between automation and compliance.",
      ],
      resultsClosing:
        "These results shifted what program administrators could promise to their stakeholders. A completion timeline that previously depended on reviewer headcount and queue depth now depends only on submission volume. The fraud vectors that programs had learned to accept as undetectable are no longer in the threat model.",
      workflowSteps: [
        {
          step: 1,
          title: "Field photo fraud pattern mapping",
          description:
            "We catalogued every failure mode that human review was encountering in production: coordinate misreads, application number format errors, missed accessory items, and the two forensic fraud categories that were undetectable by any manual means.",
        },
        {
          step: 2,
          title: "Offline-first architecture decision",
          description:
            "Before any model selection occurred, we resolved the data residency constraint. Field photographs contain biometric data and precise location telemetry subject to program privacy mandates. The decision to build an offline-first edge system was made at this stage and held as a hard constraint throughout every subsequent design decision.",
        },
        {
          step: 3,
          title: "ROI tamper gate and dual-pass OCR engineering",
          description:
            "The dynamic exclusion mask pipeline was built by cataloguing the specific overlay types produced by mobile camera apps in the target deployment environment. The dual-pass OCR merge logic was tuned against real field photographs drawn from the program's existing submission archive.",
        },
        {
          step: 4,
          title: "Regional format validation and adversarial testing",
          description:
            "Every state region's application number format, coordinate range specification, and script mixing pattern was encoded into the regional configuration layer and tested against the full archive of prior submissions — including known fraudulent ones.",
        },
        {
          step: 5,
          title: "Edge deployment and compliance handoff",
          description:
            "Deployment on workstation-class hardware required final calibration of the hybrid execution architecture. The compliance handoff included documentation of the audit trail format, the regional configuration reload procedure, and the escalation routing for submissions flagged as ambiguous.",
        },
      ],
      whatsNext: [
        {
          title: "Datacenter-scale escalation tier",
          paragraphs: [
            "Every submission now produces a structured, machine-readable verdict with pixel-level evidence, OCR-extracted fields, and segmentation outputs. Ambiguous verdicts can be routed to datacenter-scale reasoning models in a second tier without re-engineering the ingestion or decision layer.",
            "The edge system handles volume at program scale. The datacenter tier handles the cases that require deeper reasoning — the laboratory hierarchy that forensic programs use.",
          ],
        },
        {
          title: "Regional format expansion",
          paragraphs: [
            "The regional configuration layer positions the system to absorb new state formats and compliance requirements without code changes. As additional regions are onboarded, the forensic evidence archive grows, and that archive is the training substrate for the next generation of detection models.",
            "Duplicate registry coverage, fraud pattern libraries, and regional format corpora all compound with every submission the system processes.",
          ],
        },
        {
          title: "Explainable rejection for legal challenges",
          paragraphs: [
            "The broader direction in this industry is toward verification systems that can reason about evidence rather than just classify it. The question solar programs will face next is whether their verification systems can explain a rejection in terms that satisfy a legal challenge.",
            "What we built here is the foundation that makes that next question approachable — structured audit trails with annotated forensic evidence for every verdict.",
          ],
        },
      ],
    },
  },
  {
    id: "textile-printing-qc",
    category: "manufacturing",
    featured: true,
    industry: "Manufacturing",
    industryBg: "#FCEBEB",
    industryColor: "#A32D2D",
    company: "Positional Printing Facility",
    location: "India",
    avatar: "PP",
    avatarBg: "#FCEBEB",
    avatarColor: "#A32D2D",
    name: "Production Operations Team",
    role: "Production manager",
    headline:
      "Positional printing QC automation — 47 seconds to 0.5 seconds, ₹2.9 Crore saved annually",
    quote:
      "AI visual monitoring cut positional printing fabric waste by 35% and freed 80% of QC headcount — not because operators were replaced by something smarter, but because they were finally removed from a task human biology was never suited to perform.",
    problem:
      "18–24 QC operators per day monitoring screens across three shifts; human fatigue drove a 20–35% error escape rate and 12–18% monthly fabric waste on lines valued at ₹700–₹3,000 per meter.",
    solution:
      "Screen-level visual monitoring detects misregistration in under 0.5 seconds and issues verified corrections in under 3 seconds, with no software integration or hardware modification required.",
    metrics: [
      { value: "₹2.9 Cr", label: "Annual savings" },
      { value: "35%+", label: "Fabric waste reduction" },
      { value: "<2%", label: "Error escape rate" },
    ],
    tags: [
      "Screen-level visual monitoring",
      "Misregistration detection",
      "Zero integration surface",
      "Shadow mode deployment",
      "Threshold-gated corrections",
      "Frame-level audit log",
    ],
    richDetail: {
      subtitle:
        "How screen-level visual monitoring replaced 18 QC operators per day watching for misalignment across jacquard, saree border, and lace printing lines.",
      readMinutes: 13,
      domain: "Real-time misalignment detection and automated correction on active print lines",
      scale:
        "Tens of thousands of linear meters monthly; fabric valued at ₹700–₹3,000 per meter",
      overviewParagraphs: [
        "AI visual monitoring cut positional printing fabric waste by 35% and freed 80% of QC headcount at this facility — results that arrived not because the operators were replaced by something smarter, but because they were finally removed from a task human biology was never suited to perform.",
        "The facility was printing tens of thousands of meters monthly at ₹700–₹3,000 per meter, and losing 12–18% of that to errors that a fatigued operator on hour six of a ten-hour shift could not reliably catch. What made this genuinely unexpected was not the outcome — it was how little the existing workflow had to change to get there.",
      ],
      industryContext: [
        "India's positional printing industry spans thousands of facilities handling jacquard panels, saree borders, lace trims, and embroidered garment cuts — each processing tens of thousands of linear meters per month at material values that make a 1% waste improvement worth more than most facilities spend on IT in a year.",
        "Positional printing QC automation has emerged as the critical capability gap in this segment not because the technology was unavailable, but because the industry's architecture — heterogeneous RIP software, proprietary printing platforms, legacy control interfaces — made standard integration approaches impractical. Tolerance requirements sit at ±0.3–0.5mm; at machine speeds of 50+ meters per hour, a misregistration event that goes undetected for 47 seconds wastes approximately 65cm of fabric.",
        "The standard approach held for two decades because labor was available and margins were thick enough to absorb what the waste reports showed. That model began fracturing as export orders introduced zero-defect clauses with financial penalties, and as bridal and luxury segments pushed per-meter prices into ranges where a single missed error alert could erase the profit on an entire order.",
      ],
      problemParagraphs: [
        "Every shift at this facility started the same way: operators took their positions in front of print control screens and began watching. Not for events, but against them — sustained attention pointed at a largely static interface, waiting for a small pixel-level indicator to appear, hoping fatigue wouldn't swallow the moment when it did. 18–24 operators per day across three shifts performed this function.",
        "The error indicator they were watching for — the visual signature of a misregistration event in the printing software — was small, appeared against a complex UI background, and demanded a response within seconds of appearing. The detection-to-correction window the machine allowed averaged 47 seconds. The machine didn't slow down while the operator noticed.",
        "Fabric waste consumed 12–18% of monthly output — but that figure only counted the material that was scrapped. It missed the reprinting queue delays that backed up subsequent orders, the ink loss on every wasted meter, the machine dead time during rework setup, the labour hours spent inspecting and pulling rejects, and the credibility erosion with export clients. When the facility modelled the full cost chain — fabric plus tail — the number came to ₹4 to ₹6.6 crore annually.",
        "The turning point was not gradual. A single export contract arrived with a zero-defect clause — financial penalties for any rejected batch, plus mandatory air freight on rejects. For the first time, a missed error indicator at 3 AM was not a quiet operational loss absorbed into the monthly waste number. It was a contractual liability that could erase the profit on the entire order.",
      ],
      solutionParagraphs: [
        "The first and most consequential decision was where in the production stack to operate. Three approaches were evaluated: API-based integration with the RIP or printing software, physical sensor arrays above the fabric, and screen-level visual capture. API integration would have created vendor lock-in and was unavailable on most platform variants. Physical sensor rigs introduced calibration complexity and required facility modifications.",
        "Operating at the screen layer — seeing exactly what an operator sees, acting exactly where an operator acts — meant zero modification to existing software, zero new hardware, and zero workflow disruption. It also meant the system would work across every printing software variant in the industry, not just the one it was built against.",
        "A single supervisor can now monitor three print lines simultaneously from a single station, while the system handles the sustained detection function across all of them. Error indicators that previously went unnoticed on hour eight of a night shift are now caught in under 0.5 seconds regardless of time of day, shift position, or staffing levels.",
        "The component that determined the outcome was the domain-tuned classification model trained specifically on positional printing software screen captures — jacquard, saree border, embroidery, and lace contexts, each with a distinct error signature in the software UI. The system dropped into the facility's existing workflow without restructuring it, beginning in shadow mode before a single automated correction was executed.",
      ],
      howItWorksSteps: [
        "Print screen capture",
        "Screen-state classification: active / idle / dialogue",
        "Error indicator detection on active frames",
        "Correction calculation and threshold verification",
        "Verified correction applied",
        "Re-classification pass",
        "Audit log entry and supervisor alert if outside bounds",
        "Fabric waste prevented",
      ],
      technicalSections: [
        {
          title: "Screen-state routing gate",
          paragraphs: [
            "The first processing step classifies every captured frame into one of three states: active print, idle, or dialogue. Error detection only runs on frames classified as active. This routing step was not an optimisation — it was a false-positive control.",
            "Running the error detection model against idle screens or dialogue boxes would have generated alerts that don't correspond to printable error conditions, degrading operator trust in the system's outputs and increasing the likelihood that real alerts would be dismissed.",
          ],
        },
        {
          title: "Domain-tuned misregistration classifier",
          paragraphs: [
            "The detection model was trained specifically on screen captures from positional printing software interfaces — jacquard, embroidery, saree border, and lace fabric contexts — rather than adapted from a general object detection task.",
            "The visual vocabulary of print control software is narrow and specific: error indicators are small, appear against complex UI backgrounds, and have different visual signatures depending on the fabric type being printed. Training on the actual visual vocabulary of the target environment from the outset is what produced a 97% detection rate.",
          ],
        },
        {
          title: "Correction threshold gate",
          paragraphs: [
            "Every correction calculation is evaluated against predefined safe parameter bounds before execution. Corrections outside those bounds are rejected rather than applied at reduced confidence. This was the single most important safety design decision in the system.",
            "In a ₹700–₹3,000/meter fabric context, the cost of a false correction — one that moves a registration parameter outside its safe range — exceeds the cost of a missed detection. By hard-gating corrections at the threshold level, the system converts what would otherwise be a recall-precision tradeoff into a binary safety guarantee.",
          ],
        },
        {
          title: "Closed-loop re-classification pass",
          paragraphs: [
            "After every automated correction, the system runs a re-classification pass on the subsequent frame before advancing. This verification loop catches the cases where a correction was executed correctly but the underlying condition persisted or shifted.",
            "The re-classification pass matches the verification behaviour of a careful human operator who checks their own work and is the architectural feature that enables the system to hold an error escape rate below 2% rather than simply a lower one.",
          ],
        },
        {
          title: "Three-layer failure safety architecture",
          paragraphs: [
            "The failure handling architecture operates at three distinct levels. The first layer is threshold gating — no correction outside defined safe ranges is ever executed. The second layer is a one-keypress emergency abort that halts all automation instantly and returns full control to the human operator.",
            "The third layer is a supervisor notification path that triggers whenever the system classifies a situation as outside its confidence boundary — ensuring that edge cases and novel conditions route to human judgement rather than to a low-confidence automated action.",
          ],
        },
        {
          title: "Zero integration surface architecture",
          paragraphs: [
            "The system interfaces with the production environment entirely through screen-level visual capture. No APIs, no driver modifications, no software hooks, no hardware additions. This was a deliberate architectural constraint chosen because the alternative — any form of software integration — would have created a vendor dependency that the printing industry's heterogeneous software stack makes unacceptable.",
            "Building against the visual layer means the system works with any printing software that has a visual operator interface, requires no IT involvement on deployment, and is unaffected by printing software updates except to the extent that UI changes require retraining scoped to visual classification only.",
          ],
        },
      ],
      techStack: [
        {
          label: "Visual capture layer",
          detail:
            "Screen-level capture — vendor-agnostic, modification-free, and captures every state visible to a human operator without requiring facility changes.",
        },
        {
          label: "Screen-state classifier",
          detail:
            "Multi-class visual classifier trained on print software interface states — routes frames to the correct downstream model, eliminating false-positive load from idle and dialogue frames.",
        },
        {
          label: "Misregistration detector",
          detail:
            "Domain-tuned computer vision model trained on positional printing software screen captures — built from the visual vocabulary of the actual target environment.",
        },
        {
          label: "Correction engine",
          detail:
            "Threshold-gated parameter correction module — applies corrections only when they fall within predefined safe bounds, converting probabilistic confidence into a binary safety guarantee.",
        },
        {
          label: "Verification loop",
          detail:
            "Post-correction re-classification pass — catches persistent or shifted error conditions that a one-shot correction would miss, enabling sub-2% error escape rates.",
        },
        {
          label: "Audit system",
          detail:
            "Frame-level timestamped event log — produces both the objective QC record that resolves production/QC disputes and the labelled training dataset for model improvement over time.",
        },
        {
          label: "Failure handling",
          detail:
            "Three-layer safety architecture (threshold gate + one-keypress abort + supervisor notification) — ensures the system fails safely to human oversight rather than acting at low confidence.",
        },
        {
          label: "Deployment infrastructure",
          detail:
            "Shadow mode pipeline — runs full detection and logging without executing corrections, generating the comparison data that validates the system before it is trusted with live automation.",
        },
      ],
      resultsTable: [
        {
          metric: "Annual loss (fabric + tail)",
          before: "₹4–₹6.6 Cr",
          after: "₹1.1–₹3.7 Cr",
        },
        {
          metric: "Error escape rate",
          before: "20–35%",
          after: "<2%",
        },
        {
          metric: "Fabric waste (monthly output)",
          before: "12–18%",
          after: "2–4%",
        },
        {
          metric: "Detection latency",
          before: "47 seconds",
          after: "<0.5 seconds",
        },
        {
          metric: "Correction cycle",
          before: "Operator-dependent",
          after: "<3 seconds",
        },
        {
          metric: "QC operators per day",
          before: "18–24",
          after: "~4–6",
        },
      ],
      resultHighlights: [
        "Error escape rate reduced from 20–35% to under 2% — eliminating the entire category of errors that became waste before any operator noticed them.",
        "Fabric waste reduced by 35%+ — monthly output loss dropped from 12–18% to 2–4%, crossing the raw material efficiency threshold at which even a single percentage point improvement pays for the system.",
        "Detection latency dropped from 47 seconds to under 0.5 seconds — at 50+ meters per hour, misalignment is now caught within approximately 2.5cm of material, versus the 65cm wasted during the previous average detection window (derived).",
        "QC operator headcount reduced by 80% — 18 of 24 daily operators redeployed from sustained screen-watching to exception handling, process improvement, and supervisory roles.",
        "ROI achieved in 6–8 weeks — payback before the first quarterly review cycle.",
      ],
      resultsClosing:
        "What these numbers unlocked was not just cost reduction — it was a change in how the facility could talk to its highest-value clients. A facility with a sub-2% error escape rate and a complete frame-level audit trail can stand behind its QC claims in a way that a facility with a fatigued three-shift monitoring team simply cannot.",
      workflowSteps: [
        {
          step: 1,
          title: "Print screen failure mapping",
          description:
            "Before writing a line of code, we mapped the full failure chain — what the print control screen looks like in each operational state, where error indicators appear, how they differ across fabric types, and at what point in a shift operator detection probability falls below the threshold where errors become waste.",
        },
        {
          step: 2,
          title: "Visual layer architecture decision",
          description:
            "We evaluated every integration point in the production stack — RIP API hooks, hardware sensor arrays above the fabric, and screen-level capture — against the specific constraints of the positional printing environment. Screen-level capture was the only approach that satisfied all four constraints simultaneously.",
        },
        {
          step: 3,
          title: "Domain corpus build and model training",
          description:
            "We built the training dataset from actual screen captures of positional printing software interfaces across all four fabric type contexts — jacquard, saree border, embroidery, and lace — capturing the full range of operational states, error indicator appearances, and UI backgrounds.",
        },
        {
          step: 4,
          title: "Shadow mode validation across shift fatigue curve",
          description:
            "Before executing a single automated correction, the system ran in shadow mode for a full validation period — detecting, logging, and comparing against human operator detections across all three shifts. The shadow mode data was the evidence that converted sceptical stakeholders into advocates.",
        },
        {
          step: 5,
          title: "Live deployment with supervised correction handoff",
          description:
            "Live automation was enabled incrementally — starting with the correction threshold gates at conservative bounds and widening them as the re-classification verification loop confirmed correction outcomes over several thousand print events. Operators were transitioned to exception handling and supervision with the shadow mode comparison data as context.",
        },
      ],
      whatsNext: [
        {
          title: "Predictive registration drift detection",
          paragraphs: [
            "The frame-level audit log accumulated during live operation is now a labelled dataset of every error type, correction applied, and outcome verified. Registration drift doesn't appear from nowhere; it develops from machine calibration states that are visible in the data before the first wasted meter appears.",
            "Shifting the QC function from error detection to error prevention — stopping the waste before it starts rather than minimising it after the fact — is the next logical capability, and the infrastructure to build it is already running in production.",
          ],
        },
        {
          title: "Multi-line monitoring from a single station",
          paragraphs: [
            "The screen-level architecture that works on one line works on three simultaneously; the only constraint is supervisor cognitive load, which the system already manages by handling the sustained monitoring function and routing only exception conditions to human attention.",
            "For smaller facilities that currently cannot afford a dedicated QC headcount, one part-time supervisor with the system running across all lines is operationally viable in a way that a three-shift monitoring team is not.",
          ],
        },
        {
          title: "Industry-wide data advantage",
          paragraphs: [
            "The positional printing industry is at the beginning of a transition from labor-density QC to architecture-level QC — and the facilities that build the audit trail now will hold a data advantage in five years that no amount of future investment in detection can replicate from a standing start.",
            "The audit trail, the shift fatigue comparison data, and the domain-specific training corpus that this deployment produced make that extension faster to build and more reliable from day one than this first facility was.",
          ],
        },
      ],
    },
  },
];

export const CASE_STUDY_QUOTES: CaseStudyQuoteItem[] = [
  {
    quote:
      "Lost weekend leads constantly. OnDial answers calls and books viewings.",
    name: "Ravi Shah",
    role: "Principal broker",
    company: "Prestige Realty",
    avatar: "RS",
    avatarBg: "#EEE9FC",
    avatarColor: "#3C3489",
  },
  {
    quote:
      "No-shows killed revenue. Patients now confirm appointments automatically.",
    name: "Dr. Sunita Patel",
    role: "Operations director",
    company: "Apollo Clinics Group",
    avatar: "SP",
    avatarBg: "#FCEBEB",
    avatarColor: "#A32D2D",
  },
  {
    quote:
      "Customers missed payment dates. OnDial reminders boosted collections fast.",
    name: "Amit Kumar",
    role: "Head of collections",
    company: "QuickLoan Finance",
    avatar: "AK",
    avatarBg: "#E6F1FB",
    avatarColor: "#0C447C",
  },
  {
    quote:
      "Cart abandonment hurt sales. OnDial calls back in 15 minutes.",
    name: "Priya Mehta",
    role: "Head of growth",
    company: "StyleCart",
    avatar: "PM",
    avatarBg: "#E1F5EE",
    avatarColor: "#085041",
  },
  {
    quote:
      "Admissions was overwhelmed. OnDial handles enrolment confirmations now.",
    name: "Rohit Verma",
    role: "Admissions director",
    company: "NextGen Academy",
    avatar: "RV",
    avatarBg: "#FAEEDA",
    avatarColor: "#633806",
  },
  {
    quote:
      "Five calls per shipment, every time. OnDial updates at every milestone.",
    name: "Kiran Rao",
    role: "Customer experience lead",
    company: "SwiftMove Logistics",
    avatar: "KR",
    avatarBg: "#E6F1FB",
    avatarColor: "#0C447C",
  },
];

export const CASE_STUDY_IMPACT = {
  eyebrow: "Aggregate impact",
  title: "What OnDial customers achieve",
  subtitle: "Measured across 500+ businesses and 10M+ automated calls on the OnDial platform.",
  items: [
    { icon: "phone-check", color: "#534AB7", value: "80%", label: "Fewer missed calls on average" },
    { icon: "trending-down", color: "#1D9E75", value: "60%", label: "Reduction in call center costs" },
    { icon: "users", color: "#EF9F27", value: "3×", label: "More leads qualified per month" },
    { icon: "clock", color: "#A32D2D", value: "<2s", label: "Average AI answer time" },
    { icon: "star", color: "#534AB7", value: "4.9★", label: "Average customer CSAT score" },
    { icon: "calendar-check", color: "#1D9E75", value: "40%", label: "More appointments booked" },
  ],
} as const;

export const CASE_STUDY_TIMELINE = {
  eyebrow: "Typical customer journey",
  title: "From sign-up to results in days",
  subtitle:
    "Most OnDial customers see measurable outcomes within the first week. Here is what the journey looks like.",
  steps: [
    {
      phase: "Day 1",
      time: "Setup",
      title: "Connect CRM and choose a template",
      description:
        "Integrate with HubSpot, Salesforce, or Zoho in minutes. Pick an industry-ready call template — no custom code required.",
      pill: "Live in under 30 minutes",
      pillBg: "#EEEDFE",
      pillColor: "#3C3489",
    },
    {
      phase: "Day 2",
      time: "First calls",
      title: "AI agent starts handling calls",
      description:
        "Inbound and outbound calls go live. The AI greets callers, handles inquiries, books appointments, and logs everything to your CRM automatically.",
      pill: "First lead captured within hours",
      pillBg: "#E1F5EE",
      pillColor: "#085041",
    },
    {
      phase: "Week 1",
      time: "Optimise",
      title: "Review analytics and tune the agent",
      description:
        "Use the real-time dashboard to review call transcripts, sentiment scores, and conversion rates. Adjust scripts and routing based on what you see.",
      pill: "Average 40% improvement in week one",
      pillBg: "#FAEEDA",
      pillColor: "#633806",
    },
    {
      phase: "Month 1",
      time: "Scale",
      title: "Scale without scaling headcount",
      description:
        "Handle 10× the call volume with the same team. Add new use cases — outbound campaigns, follow-ups, multilingual support — without extra setup.",
      pill: "Full ROI typically seen within 30 days",
      pillBg: "#E1F5EE",
      pillColor: "#085041",
    },
  ],
} as const;

export const CASE_STUDY_CTA = {
  eyebrow: "Get started",
  title: "Your business could be the next story.",
  subtitle:
    "Book a 20-minute walkthrough and see exactly how OnDial would handle your call volume — no setup required to start the call.",
  primaryCta: "Watch a demo",
  secondaryCta: "Talk to sales",
} as const;

export function getCaseStudyHref(id: string) {
  return `/case-studies/${id}`;
}

export function getCaseStudyById(id: string): CaseStudyItem | undefined {
  return CASE_STUDIES.find((item) => item.id === id);
}

export function getRelatedCaseStudies(id: string, limit = 3): CaseStudyItem[] {
  const current = getCaseStudyById(id);
  if (!current) return CASE_STUDIES.slice(0, limit);

  const sameCategory = CASE_STUDIES.filter(
    (item) => item.id !== id && item.category === current.category,
  );
  const others = CASE_STUDIES.filter(
    (item) => item.id !== id && item.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
