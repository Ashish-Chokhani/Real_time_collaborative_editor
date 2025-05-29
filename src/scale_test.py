import subprocess
import time
import psutil
import matplotlib.pyplot as plt

# Parameters
client_counts = [10, 20, 30, 40, 50]
duration = 10  # seconds to monitor
node_script = "simulate_clients.js"

cpu_results = []
mem_results = []

def get_node_pid():
    """Find the most recent Node.js process that runs puppeteer-script.js."""
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = proc.info['name']
            cmdline = proc.info['cmdline']
            if name and "node" in name.lower() and cmdline and isinstance(cmdline, list):
                if any(node_script in arg for arg in cmdline):
                    return proc.info['pid']
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return None

for num_clients in client_counts:
    print(f"\n🚀 Running scale test with {num_clients} clients...")

    # Start Puppeteer as a subprocess
    puppeteer_proc = subprocess.Popen(["node", node_script, str(num_clients)])
    time.sleep(2)  # Give it a moment to spawn browsers

    # Find and track the process
    pid = None
    for _ in range(5):  # Try for 5 seconds
        pid = get_node_pid()
        if pid:
            break
        time.sleep(1)

    if pid is None:
        print("❌ Node process not found.")
        puppeteer_proc.kill()
        continue

    print(f"📌 Monitoring PID {pid}...")
    p = psutil.Process(pid)

    cpu_usage = []
    mem_usage = []

    try:
        for _ in range(duration):
            cpu = p.cpu_percent(interval=1)
            mem = p.memory_info().rss / (1024 ** 2)  # MB
            cpu_usage.append(cpu)
            mem_usage.append(mem)
    except psutil.NoSuchProcess:
        print("⚠️ Process ended early.")

    # Store average usage
    cpu_avg = sum(cpu_usage) / len(cpu_usage) if cpu_usage else 0
    mem_avg = sum(mem_usage) / len(mem_usage) if mem_usage else 0
    cpu_results.append(cpu_avg)
    mem_results.append(mem_avg)

    print(f"✅ Done: CPU={cpu_avg:.2f}%, MEM={mem_avg:.2f}MB")

    puppeteer_proc.wait()

# Plot the results
plt.figure(figsize=(10, 5))

plt.subplot(1, 2, 1)
plt.plot(client_counts, cpu_results, marker='o')
plt.title("CPU Usage vs num_clients")
plt.xlabel("num_clients")
plt.ylabel("CPU Usage (%)")

plt.subplot(1, 2, 2)
plt.plot(client_counts, mem_results, marker='o', color='orange')
plt.title("Memory Usage vs num_clients")
plt.xlabel("num_clients")
plt.ylabel("Memory (MB)")

plt.tight_layout()
plt.savefig("scale_test_results.png")
plt.show()