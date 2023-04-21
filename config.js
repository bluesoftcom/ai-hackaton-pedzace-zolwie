const config = {
    time: null,
    difficulty_level: null
  };

  function handleSubmit(event) {
    event.preventDefault(); // prevent form submission

    const form = document.getElementById("my-form");
    const timeInput = form.elements["time"];

    // check if time field is empty
    if (timeInput.value === "") {
      alert("Please enter a value for Time.");
      return; // exit the function
    }

    // get form values and store them in config object
    config.time = timeInput.value;
    config.difficulty_level = form.elements["difficulty_level"].value;

    // display chosen options
    alert(`Time: ${config.time}\nDifficulty Level: ${config.difficulty_level}`);
  }

  // attach event listener to form submit button
  const form = document.getElementById("my-form");
  form.addEventListener("submit", handleSubmit);
