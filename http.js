// http.js
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);
export default {
  port: 3000,
  fetch(request) {
    const region = request.headers.get("fly-region") || "??";
    const url = new URL(request.url);
    console.log(request.headers.get("fly-client-ip"), request.url);
    return new Response(`
      <html>
        <main>
          <img src="https://astro.build/assets/press/full-logo-light.svg" style="height: 48px;" alt="astro logo" />
          <h1>Theo's Crappy Benchmark (Astro On Vercel Edge)</h1>
          <h2><span>Full request to render time (according to Theo): <span id="overrideme" />ms</span></h2>
          <script>
            const currentTime = new Date();
            // round trip time
            const fullTime = currentTime - window.performance.timing.requestStart;
            document.getElementById('overrideme').innerHTML = fullTime.toString();
            console.log('THEO REPORTS', fullTime);
    
            const times = JSON.parse(localStorage.getItem('astro-edge-times-store')) ?? [];
            times.push(fullTime);
            localStorage.setItem('astro-edge-times-store', JSON.stringify(times));
            console.table(times);
          </script>
        </main>
      </html>`);
  },
};
