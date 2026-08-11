// ═══════════════════════════════════════════════════════════════
//  CONFIG — Change the execution date/time here
//  Format: Year, Month (0-11), Day, Hour (24h), Minute, Second
//  Or use URL: ?date=2026-08-15T20:00:00
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Default: 7 days from first visit if no date set — edit this!
  executionDate: new Date(2026, 7, 17, 20, 0, 0), // Aug 17, 2026 @ 8:00 PM
  targetName: "TUCKER",
};

function getTargetDate() {
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get("date");

  if (dateParam) {
    const parsed = new Date(dateParam);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  return CONFIG.executionDate;
}

const targetDate = getTargetDate();

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  targetDateLabel: document.getElementById("target-date"),
  countdownSection: document.getElementById("countdown-section"),
  executedSection: document.getElementById("executed-section"),
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTargetDate(date) {
  return date.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    els.countdownSection.classList.add("hidden");
    els.executedSection.classList.remove("hidden");
    document.title = "EXECUTION COMPLETE — SUPER EARTH";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

els.targetDateLabel.textContent = `SCHEDULED: ${formatTargetDate(targetDate)}`;

updateCountdown();
setInterval(updateCountdown, 1000);
