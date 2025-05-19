import '@fontsource/special-elite';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

window.L = L;
const stickynotetext = document.getElementById('sticky-note-time');
const countDownDate = new Date("May 24, 2025 12:00:00").getTime();

let x = setInterval(function() {

    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    stickynotetext.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        stickynotetext.innerHTML = "NOW!";
    }
}, 1000);

async function loadSchedule() {
    try {
        const response = await fetch(
            "https://serenidad.click/hacktime/getSchedule/41ccd101-5751-4d3f-886a-21035af2f81b"
        );
        const data = await response.json();
        document.getElementById("content-area").innerHTML = `
            <h2 class="text-2xl font-bold text-green-500 uppercase mb-4">MISSION SCHEDULE</h2>
            <div class="border-l-2 border-green-500 pl-4">
              ${data.schedule
            .map(
                (item) => `
                    <div class="mb-4">
                      <h3 class="font-bold">
                        ${item.title || "TBD"}
                      </h3>
                      <p class="text-sm">
                        ${new Date(item.time.start).toLocaleTimeString("en-US", {
                    timeZone: "ETC/UTC",
                    hour: "2-digit",
                    minute: "2-digit",
                })} -
                        ${new Date(item.time.end).toLocaleTimeString("en-US", {
                    timeZone: "ETC/UTC",
                    hour: "2-digit",
                    minute: "2-digit",
                })}:
                        ${new Date(item.time.start).toLocaleString("en-US", {
                    timeZone: "ETC/UTC",
                    weekday: "long",
                })}
                      </p>
                    </div>
                  `
            )
            .join("")}
            </div>
            <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
          `;
        addBackButtonListener();
    } catch (error) {
        console.error("Error fetching schedule:", error);
        document.getElementById("content-area").innerHTML = `
            <p class="text-red-500">Failed to load the schedule. Please try again later.</p>
            <p class="text-black">If you continue getting this error, click <a href="https://serenidad.click/hacktime/getSchedule/41ccd101-5751-4d3f-886a-21035af2f81b" class="text-blue-500 decoration-wavy underline" target="_blank">here</a>, allow the link, then reload the page. Don't worry, it's totally safe!</p>
            <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
          `;
        addBackButtonListener();
    }
}
const originalContent = document.getElementById("content-area").innerHTML;
const contents = {
    sponsors: `
          <h2 class="text-2xl font-bold text-blue-500 uppercase mb-4">OUR SPONSORS</h2>
          <!-- Black Ops Patron (Diamond) - $2500+ -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 border-b-2 border-[#38b6ff] pb-1 mb-4">Black Ops Patron (Diamond) - $2500+</h2>
            <div class="grid grid-cols-1 gap-4 mb-6">
              <div class="p-6 rounded shadow-md border-2 border-[#38b6ff]" style="background-color: #38b6ff10;">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-3">
                  <img src="/nosint.png" alt="NoSint" class="w-24 h-24 object-cover rounded mr-3 mb-2 sm:mb-0">
                  <h3 class="text-xl font-bold"><a href="https://nosint.org" class="underline text-[#38b6ff]">NoSint</a></h3>
                </div>
                <p class="text-sm">NoSINT is a blazing-fast, community-driven OSINT platform with 320+ tools, powerful recovery features, and cutting-edge bypass tech. Pay as you go—no subscription. Trusted by 800+ users. Start now at NoSINT.org and follow updates at <a href="https://t.me/NekoOsintUpdates" class="underline text-[#38b6ff]">https://t.me/NekoOsintUpdates</a></p>
              </div>
            </div>
          </div>
          <!-- Chief of Intelligence (Gold) - $1000+ -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-1 mb-4">Chief of Intelligence (Gold) - $1000+</h2>
            <div class="grid grid-cols-1 gap-4 mb-6">
              <div class="bg-yellow-50 p-5 rounded shadow-md border border-yellow-300">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-3">
                  <img src="/nif.png" alt="National Interest Foundation" class="w-20 h-20 object-cover rounded mr-3 mb-2 sm:mb-0">
                  <h3 class="text-lg font-bold"><a href="https://nifusa.org/?utm_source=rehacted" class="underline text-yellow-700">National Interest Foundation</a></h3>
                </div>
                <p class="text-sm">An American Interest Towards a Better and More Innovative Foreign Policy</p>
              </div>
            </div>
          </div>
          <!-- Analyst (Silver) - $500+ -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 border-b-2 border-gray-400 pb-1 mb-4">Analyst (Silver) - $500+</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <!-- Code Ninjas Silver sponsor -->
              <div class="bg-gray-100 p-4 rounded shadow-sm border border-gray-300">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="/CodeNinjasLogotStacked.svg" alt="Code Ninjas Alexandria" class="w-16 h-16 object-contain rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold"><a href="https://www.codeninjas.com/va-alexandria" class="underline text-gray-700">Code Ninjas Alexandria</a></h3>
                </div>
                <p class="text-sm">Code Ninjas® is the world's largest and fastest-growing kids coding franchise, with hundreds of locations in the United States, Canada, and the United Kingdom. Our goal is to create the problem solvers of tomorrow. At our Alexandria center, kids learn to code while building their own video games in a fun, safe, and inspiring environment.</p>
              </div>
            </div>
          </div>
          <!-- Field Operative (Bronze) - $250+ -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 border-b-2 border-[#b04c0e] pb-1 mb-4">Field Operative (Bronze) - $250+</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded shadow-sm border border-[#b04c0e]/30" style="background-color: #b04c0e10;">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="https://avatars.githubusercontent.com/u/182854818?s=200&v=4" alt="Femboy Cyber Networks" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://femboy.zip/?utm_source=rehacted" class="underline text-[#b04c0e]">Femboy Cyber Networks</a></h3>
                </div>
                <p class="text-sm">Not Your Usual Privacy Friendly ISP</p>
              </div>
              <div class="p-4 rounded shadow-sm border border-[#b04c0e]/30" style="background-color: #b04c0e10;">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="https://images.squarespace-cdn.com/content/v1/63b728234038052a59b65936/5ff7fd00-5334-4dda-aad8-260161a8bf50/favicon.ico?format=100w" alt="&pizza" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://andpizza.com/?utm_source=rehacted" class="underline text-[#b04c0e]">&amp;pizza</a></h3>
                </div>
                <p class="text-sm">&amp;pizza is a bold and innovative pizza brand dedicated to quality and individuality. We offer a variety of unique and delicious pizzas, crafted with fresh ingredients and baked to perfection.</p>
              </div>
            </div>
          </div>
          <!-- Field Operatives (Non-tiered sponsors) -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">Field Operatives</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded border border-gray-200">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="https://scrapyard.shayaand.hackclub.app/static/lucid.jpg" alt="𝕝𝕦𝕔𝕚𝕕" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://jjjhhhppp.vip/?utm_source=rehacted" class="underline">𝕝𝕦𝕔𝕚𝕕</a></h3>
                </div>
                <p class="text-sm">jjjhhhppp</p>
              </div>
              <div class="p-4 rounded border border-gray-200">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="/brentan.png" alt="Brentan Rath" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://www.linkedin.com/in/brentan-rath-2a1867343/" class="underline">Brentan Rath</a></h3>
                </div>
                <p class="text-sm">100% Professional Vibe Coding, Cursor Using, GPT Pro Using Skiddie</p>
              </div>
              <div class="p-4 rounded border border-gray-200">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="/micha.png" alt="Micha Albert" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://2231puppy.tech" class="underline">Micha Albert</a></h3>
                </div>
                <p class="text-sm">Resident Procrastinator & Chief OnBoard Live Magician</p>
              </div>
              <div class="p-4 rounded border border-gray-200">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="https://hips.hearstapps.com/hmg-prod/images/scottish-fold-playing-royalty-free-image-1718211849.jpg?crop=0.631xw:0.946xh;0.00510xw,0.00765xh&resize=980:*" alt="Snout.nu" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="https://snout.nu/?utm_source=rehacted" class="underline">Snout.nu</a></h3>
                </div>
                <p class="text-sm">Snout is a privacy-first writing platform with custom domains, <150ms loading times, GDPR-compliant analytics, and without the tracking. It's also 100% free.</p>
              </div>
              <div class="p-4 rounded border border-gray-200">
                <div class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
                  <img src="https://hips.hearstapps.com/hmg-prod/images/scottish-fold-playing-royalty-free-image-1718211849.jpg?crop=0.631xw:0.946xh;0.00510xw,0.00765xh&resize=980:*" alt="Snout.nu" class="w-16 h-16 object-cover rounded mr-2 mb-2 sm:mb-0">
                  <h3 class="font-bold break-words"><a href="#" class="underline">The Rath Family</a></h3>
                </div>
                <p class="text-sm">The Rath Family donated to this event for private reasons.</p>
              </div>
            </div>
          </div>
          <p class="text-gray-700">Thanks to our sponsors for making this mission possible! If you wish to partner with us for this mission, please contact us at <a href="mailto:sponsor@rehacted.org" class="underline text-blue-700">sponsor@rehacted.org</a></p>
          <div class="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors duration-200" style="background-color: #3ec14a10;">
            <h2 class="text-xl font-bold text-green-500 mb-2">Inquire About Sponsorship Anonymously</h2>
            <div style="display: flex; gap: 20px; align-items: center; margin: 15px">
              <img src="https://play-lh.googleusercontent.com/VDNa2MlVC3S5_8czrBSE01ilvmHTMS8NFJie6T9K4USUmnj5ETrf4pngGBPo8dZ3qYw" style="width: 200px" alt="Session">
              <div>
                <p class="text-gray-700 mb-2 text-sm">If you want to get in touch about sponsorship without using any personally identifiable information, feel free to contact us at our session address.</p>
                <div class="bg-gray-100 p-2 rounded mb-3 overflow-x-auto">
                  <code class="text-xs text-gray-800">42D8Hn17pt7J7e3PA2CSudVsSqyRVqTGnDfcnpGD7VFjcsoEQTSC67zStzVYrfLv7nCD4xx15wCdAQoEPCPS25mxDuNtkyw</code>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 20px; align-items: center;">
              <a href="https://getsession.org/download" target="_blank" style="flex: 1;">
                <button class="block text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200" style="background-color: #3ec14a; width: 100%;">
                  Download Session
                </button>
              </a>
              <button class="block text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200" style="background-color: #3ec14a; flex: 1;" onclick="navigator.clipboard.writeText('05aa77a2ed6d98257d88a30c5ff1a31d8b770d4030e736ab432a1599389d374114'); alert('Copied!')">
                Copy Session Address
              </button>
            </div>
          </div>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    schedule: `
          <h2 class="text-2xl font-bold text-green-500 uppercase mb-4">MISSION SCHEDULE</h2>
          <div class="border-l-2 border-green-500 pl-4">
            <p>Loading...</p>
          </div>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    location: `
          <h2 class="text-2xl font-bold text-purple-500 uppercase mb-4">VENUE LOCATION</h2>
          <p class="text-gray-700 mb-4">Address: 8201 Greensboro Dr Suite 415, McLean, VA 22102
</p>
          <div id="map" class="w-full h-64 mb-4 rounded"></div>
          <p class="font-bold text-red-500">REMEMBER: This information is confidential.</p>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    resticked: `
          <h2 class="text-2xl font-bold text-yellow-500 uppercase mb-4">RESTICKED</h2>
          <p>Have you ever wanted to design your own stickers or share your creations with a wider audience? If so, I’d like to introduce you to ReSTICKted — a challenge where you can design stickers for Rehacted!</p>
          <p>If your design is one of the 10 selected entries, you’ll receive 50 of your stickers, and each event attendee will also receive one of your stickers. It’s a great way to showcase your work and get your design out there!</p>
          <p>Every valid submission will receive secret information about the mission, 5 of their sticker at the event, and an exclusive sticker.</p>
          <p><a href="https://forms.fillout.com/t/ev3grkgG7Eus" class="underline text-blue-700">Use this form to upload your sticker to mission control.</a></p>
          <iframe class="airtable-embed" src="https://airtable.com/embed/appHf2vkkWvY4scnh/shriF2PfvMKdTD4p4?viewControls=on" frameborder="0" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    referral: `
          <h2 class="text-2xl font-bold text-red-500 uppercase mb-4">AGENT RECRUITMENT PROGRAM</h2>
          <div class="bg-gray-100 p-4 rounded mb-4">
            <h3 class="font-bold text-xl mb-2">Special Equipment Incentive</h3>
            <p class="mb-2">Recruit five new agents for the mission and receive a <span class="font-bold">Raspberry Pi Zero W</span> field kit for your service.</p>
            <div class="flex items-center mb-2">
              <img src="/rpi.avif" alt="Raspberry Pi Zero W" class="w-24 h-auto object-cover rounded mr-2">
              <div>
                <h4 class="font-bold">Raspberry Pi Zero W</h4>
                <p class="text-sm">Compact computing hardware for covert field operations</p>
              </div>
            </div>
          </div>
          <div class="mb-6 bg-gray-100 p-4 rounded">
            <h3 class="font-bold text-lg mb-4">Generate Your Recruitment Link:</h3>
            <div class="flex flex-col md:flex-row gap-4">
              <input type="text" id="agent-name" placeholder="Enter your spy code (starts with &quot;rec&quot;)" class="border-2 border-gray-300 rounded p-2 flex-grow" aria-label="Your code name">
              <button id="generate-link-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Generate Link</button>
            </div>
            <div id="referral-link-container" class="mt-4 hidden">
              <p class="mb-2 font-bold">Your personalized recruitment link:</p>
              <div class="flex items-center">
                <input type="text" id="referral-link-output" class="border-2 border-gray-300 rounded p-2 flex-grow font-mono text-sm" readonly>
                <button id="copy-link-btn" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200" aria-label="Copy link">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
              <p id="copy-confirmation" class="text-green-600 mt-2 hidden">Link copied to clipboard!</p>
            </div>
          </div>
          <h3 class="font-bold text-lg mb-2">How it Works:</h3>
          <ol class="list-decimal pl-6 mb-4">
            <li class="mb-2">Generate your personalized recruitment link above</li>
            <li class="mb-2">Share this link with potential agents</li>
            <li class="mb-2">When they use your link, you'll automatically be credited for the referral</li>
            <li class="mb-2">Once five recruits register using your link, your Raspberry Pi Zero W will be prepared for pickup</li>
          </ol>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
            <p class="font-bold">CLASSIFIED NOTICE:</p>
            <p>All recruits must be high school students capable of participating in the 24-hour operation.</p>
          </div>
          <p class="text-gray-700">For questions about the recruitment program, contact mission control at <a href="mailto:info@rehacted.org" class="underline text-blue-700">info@rehacted.org</a></p>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    team: `
          <h2 class="text-2xl font-bold text-indigo-500 uppercase mb-4">TEAM MEMBERS</h2>
          <div class="mb-6">
            <h3 class="font-bold text-lg border-b-2 border-indigo-300 pb-2 mb-4">COMMAND CENTER</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-100 p-4 rounded">
                <div class="flex items-center gap-4 mb-2">
                  <img class="h-12 w-12 rounded-full object-cover" src="https://ca.slack-edge.com/T0266FRGM-U0836FW88DS-902157863339-512" alt="Brentan">
                  <div>
                    <h4 class="font-bold text-lg">Brentan</h4>
                    <p class="text-sm text-gray-700">Co-Organizer</p>
                  </div>
                </div>
                <p class="text-gray-700">100% Professional Vibe Coding, Cursor Using, GPT Pro Using Skiddie</p>
              </div>
              <div class="bg-gray-100 p-4 rounded">
                <div class="flex items-center gap-4 mb-2">
                  <img class="h-12 w-12 rounded-full object-cover" src="https://trello.com/1/cards/6801586725e58c27c94eb002/attachments/68015c198b599985afe93f9c/previews/68015c1a8b599985afe93fa5/download/photo.webp" alt="Kayla">
                  <div>
                    <h4 class="font-bold text-lg">Kayla</h4>
                    <p class="text-sm text-gray-700">Co-Organizer</p>
                  </div>
                </div>
                <p class="text-gray-700">She makes software to convenience life.</p>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="font-bold text-lg border-b-2 border-indigo-300 pb-2 mb-4">GROUND TEAM</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/slurpee.png" alt="Agent Slurpee" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Slurpee</h4>
                    <p class="text-xs text-gray-600">Sponsor & Venue Acquisition</p>
                  </div>
                </div>
              </div>
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/kate.png" alt="Agent Kate" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Kate</h4>
                    <p class="text-xs text-gray-600">General Assistance</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">“The mystery of human existence lies not in just staying alive, but in finding something to live for”</p>
              </div>
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/mark.png" alt="Agent Mark" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Mark</h4>
                    <p class="text-xs text-gray-600">General Assistance</p>
                  </div>
                </div>
              </div>
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/kas.png" alt="Agent Kas" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Kas</h4>
                    <p class="text-xs text-gray-600">General Assistance</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">Professional chromebook breaker</p>
              </div>
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/micha.png" alt="Agent Micha" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Micha</h4>
                    <p class="text-xs text-gray-600">Fundraising</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">PCB is are love. PCB is are life.</p>
              </div>
              <div class="bg-gray-100 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-2">
                  <img src="/kody.png" alt="Agent Kody" class="h-12 w-12 rounded-full object-cover mr-3">
                  <div>
                    <h4 class="font-bold">Kody</h4>
                    <p class="text-xs text-gray-600">Website Development</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">Cat who likes tennis, coding, and food.</p>
              </div>
            </div>
          </div>
          <button id="back-button" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Back to Mission</button>
        `,
    info: `
          <h2 class="text-2xl font-bold text-yellow-500 uppercase mb-4">MISSION INFORMATION</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- parents! -->
            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-xl font-bold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20  fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                For Parents & Chaperones
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <a href="/REHACTED-Parent-Guide.pdf" class="text-blue-600 hover:underline hover:text-blue-800">REHACTED Parent Guide</a>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <a href="/REHACTED-Chaperone-Guide.pdf" class="text-blue-600 hover:underline hover:text-blue-800">REHACTED Chaperone Guide</a>
              </ul>
            </div>
            <!-- fancy lawyer stuff -->
            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-xl font-bold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20  fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                Legal Documents
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <a href="#info" class="text-blue-600 hover:underline hover:text-blue-800" onclick="alert('Coming Soon...')">Participant Waiver Form</a>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <a href="https://hackclub.com/conduct/" class="text-blue-600 hover:underline hover:text-blue-800">Code of Conduct</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              Support the Mission
            </h3>
            <p class="text-gray-700 mb-4">Your contribution helps us provide a top-notch experience for our young agents.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="border rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200" style="background-color: #ec375010;">
                <h4 class="font-bold text-lg mb-2" style="color: #ec3750;">HCB</h4>
                <p class="text-gray-700 mb-3">Donations through HCB are tax-deductible in the US (501(c)(3))</p>
                <a href="https://hcb.hackclub.com/donations/start/rehacted" class="block w-full text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200" style="background-color: #ec3750;">Donate via HCB</a>
              </div>
              <div class="border rounded-lg p-4 bg-orange-50 hover:bg-orange-100 transition-colors duration-200" style="background-color: #f2682210;">
                  <h4 class="font-bold text-lg mb-2 flex items-center" style="color: #f26822;">
                    Monero
                  </h4>
                  <p class="text-gray-700 mb-2">We also accept Monero.</p>
                  <div class="bg-gray-100 p-2 rounded mb-3 overflow-x-auto">
                    <code class="text-xs text-gray-800">42D8Hn17pt7J7e3PA2CSudVsSqyRVqTGnDfcnpGD7VFjcsoEQTSC67zStzVYrfLv7nCD4xx15wCdAQoEPCPS25mxDuNtkyw</code>
                  </div>
                  <button onclick="navigator.clipboard.writeText('42D8Hn17pt7J7e3PA2CSudVsSqyRVqTGnDfcnpGD7VFjcsoEQTSC67zStzVYrfLv7nCD4xx15wCdAQoEPCPS25mxDuNtkyw'); alert('Copied!')" class="block w-full text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200" style="background-color: #f26822;">
                    Copy Monero Address
                  </button>
              </div>
            </div>
          </div>
          <button id="back-button" class="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Back to Mission</button>
        `,
};
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (contents[hash]) {
        document.getElementById("content-area").innerHTML = contents[hash];
        if (hash === "location") {
            initializeMap();
        } else if (hash == "referral") {
            referralLogic();
        }
        addBackButtonListener();
    } else {
        document.getElementById("content-area").innerHTML = originalContent;
    }
}
function addBackButtonListener() {
    document
        .getElementById("back-button")
        .addEventListener("click", function () {
            window.location.hash = "";
        });
}
function initializeMap() {
    const map = L.map("map").setView([38.9187, -77.2311], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    L.marker([38.92230788668433, -77.22731334669155])
        .addTo(map)
        .bindPopup("Classified Location")
        .openPopup();
}
document.getElementById("info-link").addEventListener("click", () => {
    window.location.hash = "info";
});
document.getElementById("sponsors-link").addEventListener("click", () => {
    window.location.hash = "sponsors";
});
document.getElementById("schedule-link").addEventListener("click", () => {
    loadSchedule();
    window.location.hash = "schedule";
});
document.getElementById("location-link").addEventListener("click", () => {
    window.location.hash = "location";
});
document
    .getElementById("resticked-link")
    .addEventListener("click", () => {
        window.location.hash = "resticked";
    });
function referralLogic() {
    document
        .getElementById("generate-link-btn")
        .addEventListener("click", function () {
            const agentName = document
                .getElementById("agent-name")
                .value.trim();
            if (agentName) {
                const referralLink = `https://hack.fillout.com/rehacted?referral=${encodeURIComponent(
                    agentName
                )}`;
                document.getElementById("referral-link-output").value =
                    referralLink;
                document
                    .getElementById("referral-link-container")
                    .classList.remove("hidden");
            } else {
                alert("Please enter your spy code first.");
            }
        });
    document
        .getElementById("copy-link-btn")
        .addEventListener("click", function () {
            const linkElement = document.getElementById("referral-link-output");
            linkElement.select();
            document.execCommand("copy");
            const confirmationElement =
                document.getElementById("copy-confirmation");
            confirmationElement.classList.remove("hidden");
            setTimeout(function () {
                confirmationElement.classList.add("hidden");
            }, 3000);
        });
}
document.getElementById("referral-link").addEventListener("click", () => {
    window.location.hash = "referral";
});
document.getElementById("team-link").addEventListener("click", () => {
    window.location.hash = "team";
});
window.addEventListener("hashchange", handleHashChange);
handleHashChange();
location.hash == "#schedule" ? loadSchedule() : void true;
location.hash == "#referral" ? referralLogic() : void true;