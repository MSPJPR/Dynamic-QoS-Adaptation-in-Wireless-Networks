document.getElementById("startSimBtn").addEventListener("click", startSimulation);

let chart = null;

function startSimulation() {
    const signalStrength = document.getElementById("signalStrength").value;
    const trafficType = document.getElementById("trafficType").value;
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");
    const networkStatus = document.getElementById("networkStatus");

    // Show progress bar
    progressContainer.style.display = "block";
    progressBar.style.width = "0%";

    // Setup Chart.js graph
    if (!chart) {
        const ctx = document.getElementById('qosChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Time labels
                datasets: [{
                    label: 'Throughput (Mbps)',
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    data: []
                }, {
                    label: 'Delay (ms)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: []
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Simulate QoS adaptation process
    let progress = 0;
    let time = 0;
    const simulate = setInterval(() => {
        progress += 20;
        progressBar.style.width = `${progress}%`;

        // Simulate Throughput and Delay
        let throughput = Math.max(10, Math.random() * 50); // Random throughput between 10 and 50 Mbps
        let delay = Math.random() * 100; // Random delay between 0 and 100 ms

        // Update the chart with new values
        chart.data.labels.push(time++);
        chart.data.datasets[0].data.push(throughput);
        chart.data.datasets[1].data.push(delay);
        chart.update();

        if (progress === 100) {
            clearInterval(simulate);
            networkStatus.innerHTML = `Simulation Complete: Optimizing QoS for ${trafficType} traffic with signal strength of ${signalStrength}%`;
        }
    }, 1000);
}
