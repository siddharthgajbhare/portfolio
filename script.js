//all done
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const navItems =
        document.querySelectorAll(".nav-link");

    const typingText =
        document.getElementById("typingText");

    const backToTop =
        document.getElementById("backToTop");

    const contactForm =
        document.getElementById("contactForm");

    const successMessage =
        document.getElementById("successMessage");

    const submitBtn =
        document.querySelector(".submit-btn");

    const copyEmail =
        document.getElementById("copyEmail");


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }


    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark");

        const isDark =
            body.classList.contains("dark");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen =
            navLinks.classList.contains("open");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    /* Close mobile menu */

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    const roles = [
        "Web Developer",
        "Frontend Developer",
        "React Developer",
        "Full Stack Developer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;

    let deleting = false;


    function typeRole() {

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeRole,
                    1500
                );

                return;
            }

        } else {

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

            }

        }

        setTimeout(
            typeRole,
            deleting ? 50 : 90
        );
    }

    typeRole();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       PROJECT FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            projectCards.forEach((card) => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hide");

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    function isValidEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }


    function showError(
        input,
        message
    ) {

        const group =
            input.closest(".input-group");

        group.classList.add("error");

        const error =
            group.querySelector(".error-msg");

        error.textContent =
            message;

    }


    function clearError(input) {

        const group =
            input.closest(".input-group");

        group.classList.remove("error");

        const error =
            group.querySelector(".error-msg");

        error.textContent = "";

    }


    const inputs = [
        "name",
        "email",
        "subject",
        "message"
    ];


    inputs.forEach((id) => {

        const input =
            document.getElementById(id);


        input.addEventListener(
            "input",
            () => {

                clearError(input);

            }
        );

    });


    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            let valid = true;


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            /* Name */

            if (
                name.value.trim().length < 2
            ) {

                showError(
                    name,
                    "Please enter your name."
                );

                valid = false;

            }


            /* Email */

            if (
                !isValidEmail(
                    email.value.trim()
                )
            ) {

                showError(
                    email,
                    "Please enter a valid email."
                );

                valid = false;

            }


            /* Subject */

            if (
                subject.value.trim().length < 3
            ) {

                showError(
                    subject,
                    "Please enter a subject."
                );

                valid = false;

            }


            /* Message */

            if (
                message.value.trim().length < 10
            ) {

                showError(
                    message,
                    "Message must contain at least 10 characters."
                );

                valid = false;

            }


            if (!valid) {

                return;

            }


            /* Loading state */

            submitBtn.disabled = true;

            submitBtn.querySelector("span")
                .textContent = "Sending...";

            submitBtn.querySelector("i")
                .className =
                "fa-solid fa-spinner fa-spin";


            setTimeout(() => {

                successMessage.classList.add(
                    "show"
                );

                contactForm.reset();

                submitBtn.disabled = false;

                submitBtn.querySelector("span")
                    .textContent =
                    "Send Message";

                submitBtn.querySelector("i")
                    .className =
                    "fa-solid fa-paper-plane";


                setTimeout(() => {

                    successMessage.classList.remove(
                        "show"
                    );

                }, 5000);


            }, 1200);

        }
    );


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    copyEmail.addEventListener(
        "click",
        async () => {

            const email =
                copyEmail.dataset.email;

            try {

                await navigator.clipboard.writeText(
                    email
                );

                copyEmail.innerHTML =
                    '<i class="fa-solid fa-check"></i> Copied!';


                setTimeout(() => {

                    copyEmail.innerHTML =
                        '<i class="fa-regular fa-copy"></i> Copy Email';

                }, 2000);

            } catch (error) {

                console.error(
                    "Could not copy email:",
                    error
                );

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                navLinks.classList.remove(
                    "open"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }
    );

});
