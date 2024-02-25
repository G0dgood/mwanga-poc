const NetworkConnetion = () => {
  window.addEventListener("offline", () => {
    const online: any = document.getElementById("online");
    const offline: any = document.getElementById("offline");
    online.style.display = "none";
    offline.style.display = "block";
  });

  window.addEventListener("online", () => {
    const online: any = document.getElementById("online");
    const offline: any = document.getElementById("offline");
    online.style.display = "block";
    offline.style.display = "none";
    setInterval(async () => {
      online.style.display = "none";
    }, 10000);
  });

  const checkNetworkStatus = () => {
    const online = document.getElementById("online");
    const offline = document.getElementById("offline");
    const slow = document.getElementById("slow");
    // @ts-ignore  
    if (online && offline && slow && navigator.connection) {
      // @ts-ignore  
      const effectiveType = navigator.connection.effectiveType;

      // Adjust the effective types based on your application's requirements
      const slowEffectiveTypes = ["2g"];

      if (slowEffectiveTypes.includes(effectiveType)) {
        online.style.display = "none";
        offline.style.display = "none";
        slow.style.display = "block";
        setTimeout(() => {
          slow.style.display = "none";
        }, 10000);
      }
    } else {
      console.error(
        "Network Information API is not supported or elements not found."
      );
    }
  };

  // Check network status initially
  checkNetworkStatus();

  // Listen for changes in the network connection
  window.addEventListener("online", checkNetworkStatus);
  window.addEventListener("offline", checkNetworkStatus);

  // window.addEventListener("slow", () => {
  //   const online = document.getElementById("online");
  //   const offline = document.getElementById("offline");
  //   const slow = document.getElementById("slow");
  //   online.style.display = "none";
  //   offline.style.display = "none";
  //   slow.style.display = "block";
  //   setInterval(async () => {
  //     slow.style.display = "none";
  //   }, 10000);
  // });

  return (
    <div className="alert-container">
      <div className="alert-show success-alert" id="online">
        <h5 className="success-alert-text">
          Your device is connected to the internet.
        </h5>
      </div>

      <div className="alert-show  danger-alert" id="offline">
        <h5 className="success-alert-text">
          Your device lost its internet connection.
        </h5>
      </div>
      <div className="alert-show  warning-alert" id="slow">
        <h5 className="success-alert-text">
          Your device internet connection very slow.
        </h5>
      </div>
    </div>
  );
};

export default NetworkConnetion;
