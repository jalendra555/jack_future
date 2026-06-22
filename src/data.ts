import { ServiceItem, ArticleItem } from './types';

export const PARTNERS = [
  'AWS', 'Azure', 'Google', 'Cisco', 'VMware', 'Fortinet',
  'Oracle', 'SAP', 'Adobe', 'Shopify', 'Stripe', 'Meta'
];

export const IMAGES = {
  heroServer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeB28izSzoXXru61Yut9lUPfW6AVS-Y3ttu3n2tL7Ai770poNmzyXYt7gIpmnfTAEr3cbY1jUpyFwIFkE2KqxeQP1-K7xLXareS5BVRm6iRxKz-i8rV6Yflsw0aoO9bekaz75euCxyd4AbypvbUYD3IC6T4N7kSez-tRiRdRO56H1eZ4w3Vx5XXGGxgVoE9yweSJY2kacBZLvSepIkKyigvy26MqyRd_KYEYFcXuMwrL44GFdA6gXb4tw7mjHysTlcWIlT0aTJM8Ue',
  officeWorkspace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjPv8FneWK0sME0ExFWCCCjGgTh3YU67uw4ftwY8c1ylAZHYfOk0ZyeLnB4yVzTkgCzBd9H8JAwFpJIq4Nh4a0uCmX2ylvnHdZMzkGSJ1XtPjFuK79CfjkCyvx1xTd8gT9gs90FAlynmxHPymEz2a9rp6I5HLLm6oGkOl0vRHkMRxmSJJSQ44nqXblQPVILfmguPKNFteoAhHumu5cptwAhi0J5xbW7w4xQDfz2mj10AVn-x-tzuONJjyytuJ7COxpVEjT91RTd_MM',
  logo: 'https://lh3.googleusercontent.com/aida/AP1WRLu-rAa4816V3ToFo1_XMcdwq7Ld5zln_srcfgHXoeQyY_oBugeWlDofnlz2XF1qz222p2UWKMrHeV1KIbTyOXjASNAAp7s00qoVbrJvwKGVBP-BzoXX_LuUtNv-4qPGZyvq17MHpDvUNOBM3MPj4zGUttVTnlISAO8dS5wfg5dHw16Blw4wxSGr7JAWBRZi1VZhd8_JZZU94d-TVwbuP43ylMX4L3757hfH71jtYRUlRzHzMj6GNwJVfN0I'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'cloud-devops',
    num: '01',
    title: 'Cloud & DevOps',
    description: 'Secure, scalable cloud environments with CI/CD automation for agile deployments.',
    benefits: [
      'Multi-cloud orchestration (AWS, GCP, Azure)',
      'Automated Terraform IaC templates',
      'Zero-downtime deployment pipelines',
      'Cost optimization & resource auto-scaling'
    ],
    technologies: ['Terraform', 'Kubernetes', 'AWS', 'GitHub Actions', 'ArgoCD'],
    basePrice: 8500,
    deliveryWeeks: 6
  },
  {
    id: 'cybersecurity',
    num: '02',
    title: 'Cybersecurity',
    description: 'Zero‑trust architecture, SOC monitoring, and enterprise-grade compliance protocols.',
    benefits: [
      'Continuous 24/7 endpoint vulnerability tracking',
      'ISO/IEC 27001 & SOC 2 audit readiness guides',
      'Advanced intrusion prevention and DLP safeguards',
      'Automated risk modeling and incident containment protocols'
    ],
    technologies: ['Prisma Cloud', 'Wiz', 'Cloudflare', 'Splunk', 'Okta'],
    basePrice: 12000,
    deliveryWeeks: 8
  },
  {
    id: 'software-dev',
    num: '03',
    title: 'Software Dev',
    description: 'Enterprise‑grade applications tailored specifically to your unique organizational workflows.',
    benefits: [
      'Custom React-TypeScript frontend ecosystems',
      'Highly optimized GraphQL or REST APIs',
      'Robust SQL / NoSQL database integrations',
      'Responsive, offline-first mobile web designs'
    ],
    technologies: ['React', 'TypeScript', 'NodeJS', 'PostgreSQL', 'Redis'],
    basePrice: 15400,
    deliveryWeeks: 12
  },
  {
    id: 'it-infrastructure',
    num: '04',
    title: 'IT Infrastructure',
    description: 'Modern networking, virtualization, and robust server architecture for high availability.',
    benefits: [
      'High-performance virtualization hosts',
      'Active-active hybrid load distribution configurations',
      'Redundant fiber-ring switching structures',
      'Robust site reliability monitoring grids'
    ],
    technologies: ['vSphere', 'Cisco Nexus', 'Nutanix', 'Prometheus', 'Grafana'],
    basePrice: 9500,
    deliveryWeeks: 5
  },
  {
    id: 'managed-it',
    num: '05',
    title: 'Managed IT',
    description: '24/7 monitoring, guaranteed SLAs, and proactive maintenance for complete peace of mind.',
    benefits: [
      '99.99% uptime guarantees backed by strict SLAs',
      'Proactive remote diagnostics and diagnostic sweeps',
      'Instant tier-3 helpdesk incident escalation channels',
      'Continuous system patches & backup recovery drills'
    ],
    technologies: ['Datadog', 'Jira Service Desk', 'PDQ Deploy', 'Veeam'],
    basePrice: 4200,
    deliveryWeeks: 4
  },
  {
    id: 'digital-transformation',
    num: '06',
    title: 'Digital Transformation',
    description: 'Intelligent automation, stack modernization, and high-level strategic IT consulting.',
    benefits: [
      'Legacy monolith disintegration and microservice plans',
      'Intelligent API orchestrations & workflow pipelines',
      'Strategic executive transformation and resource planning',
      'Advanced telemetry and dashboard integration frameworks'
    ],
    technologies: ['Docker', 'Apache Kafka', 'GraphQL', 'PowerBI', 'MuleSoft'],
    basePrice: 18000,
    deliveryWeeks: 10
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Ayanshu Innovations transformed our cloud infrastructure with unmatched precision and speed. They are our go-to partner for scale.',
    author: 'Rahul Verma',
    role: 'FinEdge Capital',
    initials: 'RV'
  },
  {
    quote: 'Their cybersecurity overhaul reduced our security incidents by 78% in the first quarter alone. Absolutely essential service.',
    author: 'Sarah Mathews',
    role: 'RetailHub',
    initials: 'SM'
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: 'cloud-native',
    title: 'Why Cloud‑Native Architecture Wins',
    category: 'Cloud Strategy',
    date: 'Jan 2026',
    readTime: '5 min read',
    excerpt: 'In the race for scalability, monolithic systems are falling behind. We explore how cloud-native principles drive operational excellence in 2026.',
    content: `### The Scalability Paradigm Shift

Historically, enterprise architectures were defined by large, monolithic application structures deployed on static local cluster pools. While functional, these models created profound operational friction. Scaling a single bottleneck required duplicating the entire monolith—multiplying infrastructure overhead and code complexity.

In 2026, **Cloud-Native Architecture** has progressed from an emerging methodology to the baseline requirement for digital leadership. By structuring software around containerized, stateless microservices, companies achieve unparalleled modularity and decoupling. 

#### Core Pillars of Modern Infrastructure:
1. **Container Orchestration (Kubernetes):** Dynamically scales resource allocation based on millisecond-level telemetry spikes.
2. **Infrastructure as Code (Terraform):** Declares resources declaratively, guaranteeing repeatable testing, staging, and production states.
3. **Decoupled Data Planes:** Leverages distributed, low-latency key-value stores to bypass relational write limits.
4. **Resilient Network Meshes:** Provides seamless route filtering, mutual TLS authentication, and automatic circuit breaking.

#### The Financial and Competitive Advantage
Rather than purchasing expensive redundant backup hardware, organizations utilizing modern cloud-native nodes pay exclusively for immediate, active computational loops. Case analytics showcase that businesses adopting the microservices pattern realize a **34% lower cloud execution spend** and accelerate release velocity by a factor of ten. Monoliths are no longer just an architecture choice; they are a balance-sheet vulnerability.`,
    image: IMAGES.officeWorkspace
  },
  {
    id: 'cybersecurity-modern',
    title: 'Modern Cybersecurity for Modern Threats',
    category: 'Cybersecurity',
    date: 'Dec 2025',
    readTime: '6 min read',
    excerpt: 'How zero-trust frameworks are evolving to meet the challenges of distributed work environments.',
    content: `### Dissolving the Network Perimeter

Historically, securing an enterprise was modeled after a castle-and-moat structure. Once a user navigated the exterior VPN layer or stood physically on the office network, they were implicitly trusted with lateral access to core databases and repositories. This implicit trust has rendered companies highly vulnerable to credential theft and perimeter breaches.

At Ayanshu Innovations, we implement the **Zero-Trust Framework**—governed by the fundamental motto: *Never Trust, Always Verify*.

#### Strategic Tenets of Evolving Zero-Trust:
* **Micro-Segmentation:** Division of internal services into unique, insulated communication zones.
* **Continuous Adaptive Authentication:** Tracking geolocation patterns, session duration offsets, and device integrity scores to dynamically re-verify identity.
* **Just-In-Time (JIT) Privileges:** Preventing persistent local admin access; keys are generated on-demand with automatic expiration timers.
* **Intelligent Threat Telemetry:** Leveraging machine learning on log routers to parse millisecond anomaly baselines across API calls.

Modern protection cannot depend on simple barriers. It must exist inside the operational flows of our distributed environments, transforming protection from a defensive friction point into a silent, high-performance asset.`,
    image: IMAGES.heroServer
  },
  {
    id: 'scaling-infra',
    title: 'Scaling IT Infrastructure in 2026',
    category: 'IT Infrastructure',
    date: 'Nov 2025',
    readTime: '4 min read',
    excerpt: 'Key hardware and virtualization trends that every CTO should be monitoring for the upcoming fiscal year.',
    content: `### The Convergence of Cloud and Core Edge

The upcoming fiscal year introduces unprecedented architectural densities. Modern business systems are processing terabytes of time-critical event logs daily, necessitating localized execution architectures that bypass standard round-trip network hops.

We are witnessing the rapid growth of a **hybrid-edge ecosystem**.

#### Critical Focus Vector Categories:
1. **Hyper-Converged Infrastructure (HCI):** Unifying physical computer networks, storage nodes, and virtualization hypervisors into single, redundant appliances.
2. **Deterministic SDN Backplanes:** Allocating software-defined wide area network paths to prioritize high-throughput transactional traffic.
3. **SmartNIC Hardware Acceleration:** Offloading core TLS decryption loops and packet switching algorithms to specialized processors.
4. **Automated Site Failover Drills:** Running continuous sandbox failures to verify high availability without impacting consumer services.

Investing in these elements today equips organizations with the high-throughput performance layer requested by next-generation digital applications.`,
    image: IMAGES.officeWorkspace
  }
];
