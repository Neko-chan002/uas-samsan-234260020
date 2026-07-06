window.addEventListener("error", (e) => {
    const statusText = document.getElementById("loader-status");
    if (statusText) {
        statusText.style.color = "#ff5e62";
        statusText.style.fontWeight = "bold";
        statusText.textContent = "JS Error: " + e.message + " (Line " + e.lineno + ")";
    }
});

const safeCreateIcons = () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    } else {
        console.warn("Lucide is not loaded yet.");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. PRELOADER INITIALIZATION & PROGRESS
    // ==========================================
    const preloader = document.getElementById("preloader");
    const appContainer = document.getElementById("app-container");
    const progressBar = document.getElementById("loader-progress-bar");
    const statusText = document.getElementById("loader-status");
    
    // Lucide Icons Initialization
    safeCreateIcons();

    // Set Live Date
    updateLiveDate();

    // Fake Loading Progress simulation for premium feel
    let progress = 0;
    const loadSteps = [
        { limit: 20, text: "Menginisialisasi modul SISPADA..." },
        { limit: 45, text: "Menghubungkan visualisasi data perceraian..." },
        { limit: 70, text: "Memuat struktur glassmorphism..." },
        { limit: 90, text: "Mengoptimalkan transisi halaman..." },
        { limit: 100, text: "Sistem Analisis Siap!" }
    ];

    let currentStep = 0;

    const progressInterval = setInterval(() => {
        if (progress < 100) {
            progress += Math.floor(Math.random() * 8) + 2; // Random increments
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            // Check status text update
            if (currentStep < loadSteps.length && progress >= loadSteps[currentStep].limit) {
                statusText.textContent = loadSteps[currentStep].text;
                currentStep++;
            }
        } else {
            clearInterval(progressInterval);
            
            // Fade out preloader
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                appContainer.classList.remove("hidden");
                if (window.innerWidth <= 768) {
                    appContainer.classList.add("sidebar-collapsed");
                }
            }, 500);
        }
    }, 80);
});

// ==========================================
// 2. LIVE DATE (Bahasa Indonesia)
// ==========================================
function updateLiveDate() {
    const dateDisplay = document.getElementById("date-display");
    if (!dateDisplay) return;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    dateDisplay.textContent = `${dayName}, ${date} ${monthName} ${year}`;
}

// ==========================================
// 3. TAB / NAVIGATION CONTROLLER
// ==========================================
const navItems = document.querySelectorAll(".nav-item");
const pageSections = document.querySelectorAll(".page-section");
const currentPageTitle = document.getElementById("current-page-title");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target");
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove("active"));
        // Add active class to clicked nav item
        item.classList.add("active");
        
        // Close sidebar if open on mobile
        if (window.innerWidth <= 768) {
            const appContainer = document.getElementById("app-container");
            if (appContainer) {
                appContainer.classList.add("sidebar-collapsed");
            }
            const sidebarOverlay = document.getElementById("sidebar-overlay");
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove("active");
            }
        }

        // Switch to target page
        switchPage(targetId);
    });
});

function switchPage(targetId) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Get active section
    const activeSection = document.querySelector(".page-section.active");
    
    if (activeSection === targetSection) return;

    // Set page title top bar
    let pageTitle = "Profil Utama";
    if (targetId === "page-about") pageTitle = "Tentang Data (About)";
    else if (targetId === "page-db1") pageTitle = "Dashboard Perceraian";
    else if (targetId === "page-insights") pageTitle = "Insight & Analisis";
    
    currentPageTitle.textContent = pageTitle;

    // Handle transition out of active section
    if (activeSection) {
        activeSection.style.opacity = "0";
        activeSection.style.transform = "translate3d(0, -20px, 0) scale(0.98)";
        
        setTimeout(() => {
            activeSection.classList.remove("active");
            
            // Set up target section entering
            targetSection.classList.add("active");
            // Force reflow
            targetSection.offsetHeight;
            
            targetSection.style.opacity = "1";
            targetSection.style.transform = "translate3d(0, 0, 0) scale(1)";
        }, 300);
    } else {
        targetSection.classList.add("active");
        targetSection.offsetHeight;
        targetSection.style.opacity = "1";
        targetSection.style.transform = "translate3d(0, 0, 0) scale(1)";
    }

    // Scroll main content to top
    document.querySelector(".main-content").scrollTop = 0;

    // Synchronize active nav item button if page is changed via in-page buttons
    navItems.forEach(nav => {
        if (nav.getAttribute("data-target") === targetId) {
            nav.classList.add("active");
        } else {
            nav.classList.remove("active");
        }
    });
}

// ==========================================
// 4. INTERACTIVE 3D TILT EFFECT
// ==========================================
const profileCardWrapper = document.getElementById("profile-card-3d-wrapper");
const profileCard = document.querySelector(".profile-card-3d");

if (profileCardWrapper && profileCard) {
    profileCardWrapper.addEventListener("mousemove", (e) => {
        const rect = profileCardWrapper.getBoundingClientRect();
        
        // Mouse coordinate relative to the card wrapper
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate center of card wrapper
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Limit max rotation to 15 degrees
        const maxRotation = 15;
        const rotateX = ((centerY - y) / centerY) * maxRotation;
        const rotateY = ((x - centerX) / centerX) * maxRotation;
        
        profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileCardWrapper.addEventListener("mouseleave", () => {
        // Smoothly return card to original state
        profileCard.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        profileCard.style.transform = "rotateX(0deg) rotateY(0deg)";
        
        // Remove transitions style after animation finishes so future mouse movements are snappy
        setTimeout(() => {
            profileCard.style.transition = "";
        }, 500);
    });
}

// 3D Tilt effect for mini stats cards (Subtle tilt - 8 degrees max)
const miniStats = document.querySelectorAll(".interactive-3d-mini");
miniStats.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRotation = 8;
        const rotateX = ((centerY - y) / centerY) * maxRotation;
        const rotateY = ((x - centerX) / centerX) * maxRotation;
        
        card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.4s ease";
        card.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        setTimeout(() => {
            card.style.transition = "";
        }, 400);
    });
});

// ==========================================
// 5. IFRAME CONTROLLER & LOCAL LOADERS
// ==========================================
const iframes = document.querySelectorAll(".looker-iframe");

iframes.forEach(iframe => {
    // Hide iframe initially (opacity 0 set via CSS is ready)
    iframe.style.opacity = "0";

    iframe.addEventListener("load", () => {
        const wrapper = iframe.parentElement;
        const loader = wrapper.querySelector(".iframe-loader");
        
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                iframe.style.opacity = "1";
            }, 600);
        } else {
            iframe.style.opacity = "1";
        }
    });
});

// Reload Iframe Action
const reloadBtns = document.querySelectorAll(".reload-iframe");
reloadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const iframeId = btn.getAttribute("data-iframe-id");
        const iframe = document.getElementById(iframeId);
        if (!iframe) return;

        const wrapper = iframe.parentElement;
        const loader = wrapper.querySelector(".iframe-loader");

        // Show loading spinner again
        if (loader) {
            loader.style.display = "flex";
            loader.style.opacity = "1";
        }
        iframe.style.opacity = "0";

        // Reset src to trigger reload
        const currentSrc = iframe.src;
        iframe.src = "";
        iframe.src = currentSrc;
        
        // Animate button
        const icon = btn.querySelector("i");
        icon.style.transform = "rotate(360deg)";
        icon.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        setTimeout(() => {
            icon.style.transition = "none";
            icon.style.transform = "rotate(0deg)";
        }, 800);
    });
});

// ==========================================
// 6. FULLSCREEN MODE HANDLER
// ==========================================
const fullscreenBtns = document.querySelectorAll(".fullscreen-btn");
fullscreenBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const dbContainer = btn.closest(".dashboard-container");
        if (!dbContainer) return;

        const wrapper = dbContainer.querySelector(".db-iframe-wrapper");
        if (!wrapper) return;

        wrapper.classList.toggle("fullscreen");
        
        // Change Icon based on status
        const icon = btn.querySelector("i");
        if (wrapper.classList.contains("fullscreen")) {
            icon.setAttribute("data-lucide", "minimize");
            // Change body scrollbar to hide overflow
            document.body.style.overflow = "hidden";
        } else {
            icon.setAttribute("data-lucide", "maximize");
            document.body.style.overflow = "";
        }
        safeCreateIcons(); // Redraw icons
    });
});

// Press ESC to exit fullscreen
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const fullscreenWrappers = document.querySelectorAll(".db-iframe-wrapper.fullscreen");
        fullscreenWrappers.forEach(wrapper => {
            wrapper.classList.remove("fullscreen");
            document.body.style.overflow = "";
            const dbContainer = wrapper.closest(".dashboard-container");
            const btn = dbContainer.querySelector(".fullscreen-btn i");
            if (btn) {
                btn.setAttribute("data-lucide", "maximize");
            }
        });
        safeCreateIcons();
    }
});

// ==========================================
// 7. THEME SWITCHER CONTROLLER (Pastel Theme)
// ==========================================
const themeBtns = document.querySelectorAll(".theme-btn");
const htmlTag = document.documentElement;

// Read theme from localStorage or default to 'rose'
const savedTheme = localStorage.getItem("sispada-theme") || "rose";
setTheme(savedTheme);

themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const themeName = btn.getAttribute("data-theme");
        setTheme(themeName);
    });
});

function setTheme(themeName) {
    // Set theme attribute to HTML tag
    htmlTag.setAttribute("data-theme", themeName);
    
    // Save to localStorage
    localStorage.setItem("sispada-theme", themeName);
    
    // Update active state in theme buttons
    themeBtns.forEach(btn => {
        if (btn.getAttribute("data-theme") === themeName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Animate theme transition effect (dynamic change backdrop-glows)
    const glow = document.querySelector(".preloader-backdrop-glow");
    if (glow) {
        glow.style.background = `var(--accent-primary)`;
    }
}

// ==========================================
// 8. SIDEBAR TOGGLE & BACKDROP OVERLAY
// ==========================================
const sidebar = document.querySelector(".sidebar");
const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const appContainer = document.getElementById("app-container");

if (sidebar) {
    // Toggle sidebar function
    const toggleSidebar = () => {
        if (appContainer) {
            appContainer.classList.toggle("sidebar-collapsed");
            
            // Handle overlay on mobile
            if (window.innerWidth <= 768 && sidebarOverlay) {
                if (appContainer.classList.contains("sidebar-collapsed")) {
                    sidebarOverlay.classList.remove("active");
                } else {
                    sidebarOverlay.classList.add("active");
                }
            }
        }
    };

    // Bind event listener to toggle button
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Function to close sidebar
    const closeSidebar = () => {
        if (appContainer && !appContainer.classList.contains("sidebar-collapsed")) {
            appContainer.classList.add("sidebar-collapsed");
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove("active");
            }
        }
    };

    // Close when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }
    
    // Handle window resize logic (collapses sidebar on smaller viewports automatically)
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
            if (appContainer && !appContainer.classList.contains("sidebar-collapsed") && !sidebarOverlay.classList.contains("active")) {
                appContainer.classList.add("sidebar-collapsed");
            }
        } else {
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove("active");
            }
        }
    });
}

// ==========================================
// 9. INSIGHT ACCORDION
// ==========================================
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        
        // Toggle active class on clicked item
        item.classList.toggle("active");
        
        if (item.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = 0;
        }
        
        // Close other items
        document.querySelectorAll(".accordion-item").forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-content").style.maxHeight = 0;
            }
        });
    });
});

// ==========================================
// 10. COGNITIVE AI CHATBOT (SISPADA AI)
// ==========================================
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");
const quickChips = document.querySelectorAll(".chip-btn");

// Chatbot Knowledge Base
const aiResponses = {
    factors: `Faktor pemicu utama kasus perceraian di Jawa Barat didominasi oleh:
1. 💼 <strong>Masalah Ekonomi:</strong> Menjadi pemicu tertinggi (~48.6% kasus), termasuk nafkah yang kurang, ketidakstabilan pekerjaan, dan utang.
2. 🗣️ <strong>Perselisihan Kronis:</strong> Sekitar 35.2% kasus dipicu percekcokan terus menerus akibat ego masing-masing atau kurangnya komunikasi.
3. 🧒 <strong>Pernikahan Dini:</strong> Ketidaksiapan mental pasangan muda berkorelasi tinggi dengan perceraian dini (usia pernikahan di bawah 5 tahun).
4. 💔 <strong>Faktor Lain:</strong> KDRT, perselingkuhan, dan masalah keluarga pihak ketiga (mertua/ipar).`,
    
    highest: `Wilayah dengan angka kasus perceraian tertinggi di Jawa Barat sepanjang tahun 2021-2025 secara konsisten dipimpin oleh:
1. 📍 <strong>Kabupaten Indramayu:</strong> Terkenal dengan persentase cerai gugat yang tinggi, didorong faktor migrasi ekonomi (TKI/TKW) dan pernikahan usia dini.
2. 📍 <strong>Kabupaten Bogor:</strong> Memiliki volume perceraian yang sangat tinggi karena jumlah populasi penduduk yang sangat besar.
3. 📍 <strong>Kabupaten Bandung:</strong> Menunjukkan pertumbuhan urbanisasi cepat yang membawa tekanan ekonomi perkotaan bagi keluarga baru.`,
    
    trend: `Analisis tren perceraian Jawa Barat periode 2021-2025:
- 📈 <strong>Tahun 2021-2022:</strong> Terjadi lonjakan kasus pasca-pandemi (mencapai puncak) akibat akumulasi krisis ekonomi domestik selama masa karantina.
- ➖ <strong>Tahun 2023-2024:</strong> Angka perceraian mulai menunjukkan tren stabilisasi dan penurunan tipis seiring pulihnya iklim ekonomi makro dan program bimbingan pra-nikah dari Kemenag.
- 🔮 <strong>Proyeksi 2025:</strong> Diproyeksikan angka kasus berkisar di angka 60.000 - 64.000 kasus dengan tingkat penurunan moderat jika program ketahanan keluarga terus dimasifkan.`,
    
    solutions: `Rekomendasi strategis dari AI untuk menekan tingginya angka perceraian di Jawa Barat:
1. 📚 <strong>Wajib Bimbingan Perkawinan (Bimwin):</strong> Memperketat sertifikasi pranikah bagi pasangan calon pengantin dengan materi manajemen finansial keluarga dan psikologi resolusi konflik.
2. 🪙 <strong>Pemberdayaan Ekonomi Domestik:</strong> Meluncurkan program pelatihan UMKM mandiri tingkat kelurahan khusus bagi ibu rumah tangga untuk menopang finansial keluarga.
3. 🛡️ <strong>Layanan Konseling Gratis (Crisis Center):</strong> Membentuk posko konseling pernikahan di tingkat kecamatan bekerjasama dengan psikolog profesional dan tokoh agama secara gratis.
4. 🚫 <strong>Pencegahan Pernikahan Anak:</strong> Edukasi bahaya pernikahan dini di sekolah-sekolah serta mempersulit dispensasi nikah non-darurat.`,
    
    creator: `Website <strong>SISPADA JABAR</strong> ini dikembangkan sebagai Proyek Akhir Ujian Akhir Semester (UAS) mata kuliah <strong>Manajemen Bisnis</strong>.
Pengembang aplikasi ini adalah:
👨‍🎓 <strong>Samsan</strong>
🆔 NIM: <strong>235260020</strong>
🏫 Fakultas: <strong>Teknologi Informasi</strong>`,
    
    default: `Maaf, saya belum memahami pertanyaan tersebut secara spesifik. 
Cobalah bertanya menggunakan kata kunci seperti:
- <strong>"faktor"</strong> (untuk melihat penyebab utama)
- <strong>"daerah"</strong> atau <strong>"tertinggi"</strong> (untuk mengetahui wilayah dominan)
- <strong>"tren"</strong> atau <strong>"tahun"</strong> (untuk melihat tren 2021-2025)
- <strong>"rekomendasi"</strong> atau <strong>"solusi"</strong> (untuk melihat saran pencegahan)
Or Anda bisa mengklik tombol menu pintas di bawah input chat!`
};

// Send chat message function
const sendChatMessage = (messageText) => {
    if (!messageText.trim()) return;

    // 1. Add user bubble
    appendChatBubble(messageText, "user");
    chatInput.value = "";

    // 2. Show Typing Indicator
    showTypingIndicator();

    // 3. Process response after simulated delay
    setTimeout(() => {
        hideTypingIndicator();
        const reply = processAiLogic(messageText);
        appendChatBubble(reply, "bot");
    }, 1200);
};

// Append bubble to chat messages area
const appendChatBubble = (text, sender) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
    
    // Auto Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Typing Indicator controls
let typingIndicatorElement = null;

const showTypingIndicator = () => {
    if (typingIndicatorElement) return;
    
    typingIndicatorElement = document.createElement("div");
    typingIndicatorElement.className = "chat-bubble bot typing-indicator-container";
    typingIndicatorElement.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatMessages.appendChild(typingIndicatorElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const hideTypingIndicator = () => {
    if (typingIndicatorElement) {
        typingIndicatorElement.remove();
        typingIndicatorElement = null;
    }
};

// Simple NLP Keyword matching logic
const processAiLogic = (query) => {
    const cleaned = query.toLowerCase();
    
    if (cleaned.includes("faktor") || cleaned.includes("sebab") || cleaned.includes("pemicu") || cleaned.includes("ekonomi")) {
        return aiResponses.factors;
    } else if (cleaned.includes("tertinggi") || cleaned.includes("daerah") || cleaned.includes("wilayah") || cleaned.includes("kota") || cleaned.includes("kabupaten") || cleaned.includes("indramayu")) {
        return aiResponses.highest;
    } else if (cleaned.includes("tren") || cleaned.includes("tahun") || cleaned.includes("2021") || cleaned.includes("2022") || cleaned.includes("2023") || cleaned.includes("2024") || cleaned.includes("2025")) {
        return aiResponses.trend;
    } else if (cleaned.includes("solusi") || cleaned.includes("rekomendasi") || cleaned.includes("mencegah") || cleaned.includes("preventif") || cleaned.includes("saran")) {
        return aiResponses.solutions;
    } else if (cleaned.includes("pembuat") || cleaned.includes("nama") || cleaned.includes("nim") || cleaned.includes("mahasiswa") || cleaned.includes("siapa")) {
        return aiResponses.creator;
    } else {
        return aiResponses.default;
    }
};

// Chat events
if (chatSendBtn) {
    chatSendBtn.addEventListener("click", () => {
        sendChatMessage(chatInput.value);
    });
}

if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendChatMessage(chatInput.value);
        }
    });
}

// Quick chips click events
quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
        const question = chip.getAttribute("data-question");
        sendChatMessage(question);
    });
});
