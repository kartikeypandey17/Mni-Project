/**
 * Utility: printReport
 * Triggers native browser print dialog for document previews.
 *
 * @param {string} reportTitle - Title of the report being printed
 */
export function printReport(reportTitle = 'DroneHub Analytics Report') {
  const originalTitle = document.title
  document.title = `DRONEHUB - ${reportTitle}`
  
  // Trigger standard browser print window
  window.print()
  
  document.title = originalTitle
}

export default printReport
