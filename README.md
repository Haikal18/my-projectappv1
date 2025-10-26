# 🚀 My Project App - Next.js with CI/CD

This is a [Next.js](https://nextjs.org) project with full CI/CD pipeline using GitHub Actions and Kubernetes (MicroK8s).

## 📋 Features

- ⚡ **Next.js 15** - Latest React framework
- 🐳 **Docker** - Containerized application
- ☸️ **Kubernetes** - Orchestration with MicroK8s
- 🔄 **CI/CD** - Automated deployment with GitHub Actions
- 📦 **GHCR** - GitHub Container Registry for images
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔧 **TypeScript** - Type-safe development

## 🚀 Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### Docker

```bash
# Build image
docker build -t my-projectapp .

# Run container
docker run -p 3000:3000 my-projectapp
```

## 🔄 CI/CD Pipeline

### Alur CI/CD

```
Developer push ke main
        ↓
GitHub Actions Build Docker Image
        ↓
Push Image ke GHCR
        ↓
Deploy Otomatis ke Kubernetes (MicroK8s)
        ↓
Aplikasi Running di Cluster
```

### Setup CI/CD

**Quick Setup (Recommended):**

```bash
# Di WSL2, jalankan script setup
chmod +x setup-runner.sh
./setup-runner.sh
```

**Manual Setup:**
Lihat dokumentasi lengkap di [DEPLOYMENT-SETUP.md](./DEPLOYMENT-SETUP.md)

### Deploy

Push ke branch `main` akan otomatis trigger deployment:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
```

### Monitoring

```bash
# Gunakan monitoring script
chmod +x monitor.sh
./monitor.sh

# Atau manual
microk8s kubectl get pods -l app=my-projectapp
microk8s kubectl logs -l app=my-projectapp -f
```

## 📚 Documentation

- **[CI-CD-QUICKSTART.md](./CI-CD-QUICKSTART.md)** - Panduan cepat CI/CD
- **[DEPLOYMENT-SETUP.md](./DEPLOYMENT-SETUP.md)** - Setup lengkap dan troubleshooting

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run development server |
| `pnpm build` | Build production app |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `./setup-runner.sh` | Setup MicroK8s & GitHub Runner |
| `./quick-deploy.sh` | Deploy ke Kubernetes |
| `./monitor.sh` | Monitor deployment |

## 🏗️ Project Structure

```
.
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities
├── public/                 # Static assets
├── .github/
│   └── workflows/
│       └── ci-cd.yml      # GitHub Actions workflow
├── k8s-deployment.yaml    # Kubernetes manifests
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose
└── *.sh                   # Helper scripts
```

## 🔧 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Container:** Docker
- **Orchestration:** Kubernetes (MicroK8s)
- **CI/CD:** GitHub Actions
- **Registry:** GitHub Container Registry (GHCR)

## 🎯 Kubernetes Features

- ✅ **3 Replicas** - High availability
- ✅ **Auto-scaling** - HPA based on CPU/Memory
- ✅ **Health Checks** - Liveness & Readiness probes
- ✅ **Load Balancer** - Service exposed externally
- ✅ **Resource Limits** - CPU & Memory constraints

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📝 License

MIT
