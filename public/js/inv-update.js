const form = document.querySelector("#edit-form")
    form.addEventListener("change", function () {
        const updateBtn = document.querySelector("#upButton")
        updateBtn.removeAttribute("disabled")
    })