const form = document.querySelector("#edit-form")
    form.addEventListener("change", function () {
        const updateBtn = document.querySelector("button")
        updateBtn.removeAttribute("disabled")
    })