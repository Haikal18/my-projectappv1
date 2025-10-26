# 🚀 Setup CI/CD dengan GitHub Actions dan MicroK8s di WSL2

## 📋 Alur CI/CD

```
Developer push ke branch main
         ↓
GitHub Actions Build Docker Image
         ↓
Push Image ke GHCR (GitHub Container Registry)
         ↓
Deploy Otomatis ke Kubernetes (MicroK8s di WSL2)
         ↓
Aplikasi Next.js Berjalan di Cluster
```

---

## 🛠️ Persiapan Setup

### 1. Install dan Konfigurasi MicroK8s di WSL2

```bash
# Install MicroK8s
sudo snap install microk8s --classic

# Tambahkan user ke grup microk8s
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
newgrp microk8s

# Enable add-ons yang diperlukan
microk8s enable dns
microk8s enable storage
microk8s enable ingress
microk8s enable metrics-server
microk8s enable registry

# Verifikasi instalasi
microk8s status
microk8s kubectl get nodes
```

### 2. Setup GitHub Container Registry Secret di Kubernetes

```bash
# Buat Personal Access Token (PAT) di GitHub
# Settings → Developer settings → Personal access tokens → Tokens (classic)
# Permissions: read:packages, write:packages

# Buat secret untuk pull image dari GHCR
microk8s kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<GITHUB_USERNAME> \
  --docker-password=<GITHUB_PAT> \
  --docker-email=<YOUR_EMAIL>

# Verifikasi secret
microk8s kubectl get secret ghcr-secret
```

### 3. Setup GitHub Self-Hosted Runner di WSL2

#### A. Tambahkan Runner di Repository

1. Buka repository di GitHub
2. Pergi ke **Settings** → **Actions** → **Runners**
3. Klik **New self-hosted runner**
4. Pilih OS: **Linux** dan Architecture: **x64**

#### B. Install Runner di WSL2

```bash
# Buat direktori untuk runner
mkdir ~/actions-runner && cd ~/actions-runner

# Download runner (gunakan link dari GitHub)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Konfigurasi runner (gunakan token dari GitHub)
./config.sh --url https://github.com/<USERNAME>/<REPO> --token <YOUR_TOKEN>

# Install sebagai service
sudo ./svc.sh install
sudo ./svc.sh start

# Verifikasi status
sudo ./svc.sh status
```

#### C. Jalankan Runner (Alternative tanpa service)

```bash
# Jika tidak menggunakan service, jalankan manual
./run.sh
```

---

## 🔄 Testing CI/CD Pipeline

### 1. Test Build dan Push Image

```bash
# Commit dan push perubahan
git add .
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

### 2. Monitor GitHub Actions

- Buka repository → **Actions** tab
- Lihat workflow yang sedang berjalan
- Periksa log untuk setiap step

### 3. Verifikasi Deployment di Kubernetes

```bash
# Cek pods
microk8s kubectl get pods -l app=my-projectapp

# Cek service
microk8s kubectl get svc my-projectapp-service

# Cek HPA (Horizontal Pod Autoscaler)
microk8s kubectl get hpa my-projectapp-hpa

# Lihat logs aplikasi
microk8s kubectl logs -l app=my-projectapp --tail=100 -f

# Describe pod untuk detail
microk8s kubectl describe pod -l app=my-projectapp
```

### 4. Akses Aplikasi

#### Opsi 1: Port Forward (Recommended untuk testing)
```bash
microk8s kubectl port-forward svc/my-projectapp-service 3000:80
```
Akses di browser: `http://localhost:3000`

#### Opsi 2: LoadBalancer IP (jika tersedia)
```bash
# Cek external IP
microk8s kubectl get svc my-projectapp-service

# Akses via IP
# http://<EXTERNAL-IP>
```

#### Opsi 3: NodePort (Alternative)
```bash
# Update service type ke NodePort jika LoadBalancer tidak tersedia
microk8s kubectl patch svc my-projectapp-service -p '{"spec": {"type": "NodePort"}}'

# Cek NodePort
microk8s kubectl get svc my-projectapp-service

# Akses via: http://<NODE-IP>:<NODE-PORT>
```

---

## 🐛 Troubleshooting

### Runner Tidak Bisa Connect

```bash
# Cek status runner
sudo ~/actions-runner/svc.sh status

# Restart runner
sudo ~/actions-runner/svc.sh stop
sudo ~/actions-runner/svc.sh start

# Cek logs
journalctl -u actions.runner.* -f
```

### Pod Tidak Bisa Pull Image

```bash
# Cek secret
microk8s kubectl get secret ghcr-secret

# Recreate secret jika perlu
microk8s kubectl delete secret ghcr-secret
microk8s kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<GITHUB_USERNAME> \
  --docker-password=<GITHUB_PAT> \
  --docker-email=<YOUR_EMAIL>

# Restart deployment
microk8s kubectl rollout restart deployment/my-projectapp
```

### Pod Stuck di Pending

```bash
# Cek resources
microk8s kubectl describe pod -l app=my-projectapp

# Cek nodes
microk8s kubectl get nodes
microk8s kubectl top nodes

# Cek events
microk8s kubectl get events --sort-by='.lastTimestamp'
```

### Image Pull Error

```bash
# Cek image di GHCR
# Pastikan image public atau secret sudah benar

# Manual pull test
docker pull ghcr.io/<USERNAME>/<REPO>/my-projectapp:latest

# Cek pod logs
microk8s kubectl describe pod -l app=my-projectapp
```

---

## 📝 Useful Commands

```bash
# Scaling manual
microk8s kubectl scale deployment my-projectapp --replicas=5

# Update deployment dengan image baru
microk8s kubectl set image deployment/my-projectapp \
  my-projectapp=ghcr.io/<USERNAME>/<REPO>/my-projectapp:latest

# Rollback deployment
microk8s kubectl rollout undo deployment/my-projectapp

# Lihat history deployment
microk8s kubectl rollout history deployment/my-projectapp

# Delete deployment
microk8s kubectl delete -f k8s-deployment.yaml

# Apply deployment
microk8s kubectl apply -f k8s-deployment.yaml

# Port forward
microk8s kubectl port-forward svc/my-projectapp-service 3000:80

# Exec ke pod
microk8s kubectl exec -it <POD_NAME> -- /bin/sh

# Top pods (resource usage)
microk8s kubectl top pods -l app=my-projectapp
```

---

## 🎯 Production Tips

1. **Security**
   - Gunakan RBAC untuk membatasi akses
   - Jangan commit secrets ke git
   - Gunakan GitHub Secrets untuk sensitive data

2. **Monitoring**
   ```bash
   # Enable monitoring
   microk8s enable prometheus
   microk8s enable grafana
   ```

3. **Backup**
   ```bash
   # Backup deployment config
   microk8s kubectl get deployment my-projectapp -o yaml > backup-deployment.yaml
   ```

4. **Resource Limits**
   - Sudah dikonfigurasi di k8s-deployment.yaml
   - Adjust sesuai kebutuhan aplikasi

5. **Auto-scaling**
   - HPA sudah aktif
   - Scale berdasarkan CPU (70%) dan Memory (80%)

---

## 📚 References

- [MicroK8s Documentation](https://microk8s.io/docs)
- [GitHub Actions Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
