# 🚀 CI/CD Pipeline - Quick Start Guide

## Alur CI/CD

```
Developer push ke main
        ↓
GitHub Actions Build Docker Image  
        ↓
Push Image ke GHCR (GitHub Container Registry)
        ↓
Deploy Otomatis ke Kubernetes (MicroK8s di WSL2)
        ↓
Aplikasi Next.js Running di Cluster
```

---

## ⚡ Quick Start

### 1️⃣ Setup Infrastructure (Sekali saja)

Di WSL2, jalankan script setup:

```bash
# Beri permission
chmod +x setup-runner.sh

# Jalankan setup
./setup-runner.sh
```

Script ini akan:
- ✅ Install MicroK8s
- ✅ Enable add-ons (dns, storage, ingress, metrics-server)
- ✅ Setup GHCR secret untuk pull image
- ✅ Install dan konfigurasi GitHub Self-Hosted Runner

### 2️⃣ Deploy Aplikasi

Setelah push ke branch main, GitHub Actions akan otomatis:
1. Build Docker image
2. Push ke GHCR
3. Deploy ke Kubernetes

**Atau deploy manual:**

```bash
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### 3️⃣ Akses Aplikasi

```bash
# Port forward ke localhost
microk8s kubectl port-forward svc/my-projectapp-service 3000:80

# Buka browser
http://localhost:3000
```

---

## 📋 Monitoring

### Cek Status Deployment

```bash
# Cek pods
microk8s kubectl get pods -l app=my-projectapp

# Cek service
microk8s kubectl get svc my-projectapp-service

# Cek HPA
microk8s kubectl get hpa my-projectapp-hpa

# Lihat logs
microk8s kubectl logs -l app=my-projectapp --tail=50 -f
```

### Cek GitHub Actions

1. Buka repository di GitHub
2. Klik tab **Actions**
3. Lihat workflow yang running
4. Cek logs untuk detail

---

## 🔧 Troubleshooting

### Runner Tidak Jalan

```bash
# Cek status
sudo ~/actions-runner/svc.sh status

# Restart
sudo ~/actions-runner/svc.sh restart
```

### Pod Tidak Bisa Pull Image

```bash
# Cek apakah secret ada
microk8s kubectl get secret ghcr-secret

# Recreate secret jika perlu (edit dengan data Anda)
microk8s kubectl delete secret ghcr-secret
microk8s kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_PAT \
  --docker-email=YOUR_EMAIL
```

### Deployment Gagal

```bash
# Lihat detail pod
microk8s kubectl describe pod -l app=my-projectapp

# Lihat events
microk8s kubectl get events --sort-by='.lastTimestamp'

# Rollback ke versi sebelumnya
microk8s kubectl rollout undo deployment/my-projectapp
```

---

## 📖 Dokumentasi Lengkap

Untuk setup detail dan troubleshooting lengkap, baca:
- **[DEPLOYMENT-SETUP.md](./DEPLOYMENT-SETUP.md)** - Panduan lengkap setup dan konfigurasi

---

## 🛠️ Useful Commands

```bash
# Scale pods
microk8s kubectl scale deployment my-projectapp --replicas=5

# Update image
microk8s kubectl set image deployment/my-projectapp \
  my-projectapp=ghcr.io/haikal18/my-projectappv1/my-projectapp:latest

# Restart deployment
microk8s kubectl rollout restart deployment/my-projectapp

# Delete all resources
microk8s kubectl delete -f k8s-deployment.yaml

# Apply configuration
microk8s kubectl apply -f k8s-deployment.yaml
```

---

## 📚 File Structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── k8s-deployment.yaml        # Kubernetes manifests
├── setup-runner.sh            # Setup script untuk runner & MicroK8s
├── quick-deploy.sh            # Script deploy cepat
├── DEPLOYMENT-SETUP.md        # Dokumentasi lengkap
└── CI-CD-QUICKSTART.md        # File ini
```

---

## 🎯 Tips

1. **Pastikan GitHub PAT memiliki permissions:**
   - `read:packages`
   - `write:packages`

2. **Untuk production:**
   - Gunakan specific tags, bukan hanya `latest`
   - Setup monitoring (Prometheus + Grafana)
   - Implementasi backup strategy

3. **Resource Management:**
   - HPA sudah aktif, pods akan auto-scale
   - Adjust resource limits di `k8s-deployment.yaml` sesuai kebutuhan

---

## ❓ Need Help?

- Cek **[DEPLOYMENT-SETUP.md](./DEPLOYMENT-SETUP.md)** untuk troubleshooting lengkap
- Lihat logs GitHub Actions untuk build issues
- Lihat logs pod untuk runtime issues: `microk8s kubectl logs -l app=my-projectapp`
