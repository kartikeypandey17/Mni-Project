/**
 * Utility: exportToCSV
 * Converts an array of JavaScript objects into a CSV file and triggers a browser download.
 *
 * @param {Array<Object>} data - The dataset to convert to CSV
 * @param {string} filename - The target filename for the downloaded CSV
 */
export function exportToCSV(data = [], filename = 'dronehub-report.csv') {
  if (!data || !data.length) {
    alert('No data available to export.')
    return
  }

  try {
    // Extract column headers from object keys
    const headers = Object.keys(data[0])
    
    // Convert array of objects to CSV rows
    const csvRows = []
    
    // Add header row
    csvRows.push(headers.join(','))
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header] !== undefined && row[header] !== null ? row[header] : ''
        // Escape quotes and wrap in quotes if value contains commas or quotes
        const escaped = ('' + val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }

    // Create Blob object with CSV content
    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    
    // Create temporary download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up memory
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating CSV file:', error)
    alert('Failed to generate CSV export.')
  }
}

export default exportToCSV
