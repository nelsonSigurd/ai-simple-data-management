document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".update-btn").forEach(button => {
      button.addEventListener("click", function() {
          document.getElementById("update_record_id").value = this.getAttribute("data-index");
          document.getElementById("update_first_name").value = this.getAttribute("data-first-name");
          document.getElementById("update_last_name").value = this.getAttribute("data-last-name");
          document.getElementById("update_date_of_birth").value = this.getAttribute("data-dob");
          validateUpdateForm();
      });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function() {
          document.getElementById("delete_record_id").value = this.getAttribute("data-index");
          document.getElementById("delete-name").innerText = `${this.getAttribute("data-first-name")} ${this.getAttribute("data-last-name")}`;
      });
  });

  ["update_first_name", "update_last_name", "update_date_of_birth"].forEach(id => {
      document.getElementById(id).addEventListener("input", validateUpdateForm);
  });

  // Handle form submission for creating a record
  document.getElementById("create-form")?.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("/create", {
          method: "POST",
          body: new URLSearchParams(formData)
      }).then(response => response.json()).then(data => {
          if (data.success) {
              window.location.href = "/records";
          } else {
              alert("Error: " + data.error);
          }
      });
  });

  // Handle form submission for updating a record
  document.getElementById("update-form")?.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("/update", {
          method: "POST",
          body: new URLSearchParams(formData)
      }).then(response => response.json()).then(data => {
          if (data.success) {
              window.location.reload();
          } else {
              alert("Error: " + data.error);
          }
      });
  });

  // Handle form submission for deleting a record
  document.getElementById("delete-form")?.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("/delete", {
          method: "POST",
          body: new URLSearchParams(formData)
      }).then(response => response.json()).then(data => {
          if (data.success) {
              window.location.reload();
          } else {
              alert("Error: " + data.error);
          }
      });
  });
});

// Drag & Drop functionality
function allowDrop(ev) {
    ev.preventDefault(); // Allow drop
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Set dragged card ID
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
            // Moving right → insert AFTER drop zone
            dropZone.after(draggedCard);
        } else {
            // Moving left → insert BEFORE drop zone
            dropZone.before(draggedCard);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.col-md-4').forEach(card => {
        card.addEventListener('dragstart', () => card.classList.add('dragging'));
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
});
