document.addEventListener("DOMContentLoaded", function () {
    // UPDATE Modal Logic
    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("update_record_id").value = this.getAttribute("data-index");
            document.getElementById("update_first_name").value = this.getAttribute("data-first-name");
            document.getElementById("update_last_name").value = this.getAttribute("data-last-name");
            document.getElementById("update_date_of_birth").value = this.getAttribute("data-dob");
            validateForm("update");
        });
    });

    // DELETE Modal Logic
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("delete_record_id").value = this.getAttribute("data-index");
            document.getElementById("delete-name").innerText = `${this.getAttribute("data-first-name")} ${this.getAttribute("data-last-name")}`;
        });
    });

    // Attach input validation listeners for update form
    ["update_first_name", "update_last_name", "update_date_of_birth"].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", () => validateForm("update"));
        }
    });

    // DRAG & DROP functionality
    document.querySelectorAll(".col-md-4").forEach(card => {
        card.addEventListener("dragstart", () => card.classList.add("dragging"));
        card.addEventListener("dragend", () => card.classList.remove("dragging"));
    });
});

// Drop zone logic (can stay global)
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const draggedCardId = ev.dataTransfer.getData("text");
    const draggedCard = document.getElementById(draggedCardId);
    const dropZone = ev.target.closest(".col-md-4");

    if (dropZone && draggedCard && dropZone !== draggedCard) {
        const allCards = Array.from(dropZone.parentNode.children);
        const draggedIndex = allCards.indexOf(draggedCard);
        const dropZoneIndex = allCards.indexOf(dropZone);

        if (draggedIndex < dropZoneIndex) {
            dropZone.after(draggedCard);
        } else {
            dropZone.before(draggedCard);
        }
    }
}
