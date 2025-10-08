// Dashboard Data
const dashboardData = {
  "org_status_data": [
    {"Status": "Cold", "Count": 57},
    {"Status": "Luke Warm", "Count": 17},
    {"Status": "Warm", "Count": 16}
  ],
  "multiple_domain_data": [
    {"Has_Multiple_Domains": "YES", "Count": 48},
    {"Has_Multiple_Domains": "NO", "Count": 42}
  ],
  "base_state_data": [
    {"State": "DELHI-NCR", "Count": 58},
    {"State": "MUMBAI", "Count": 32}
  ],
  "main_domain_data": [
    {"Domain": "Education", "Count": 29},
    {"Domain": "Health", "Count": 15},
    {"Domain": "Environment", "Count": 13},
    {"Domain": "Livelihood", "Count": 5},
    {"Domain": "Consulting", "Count": 4},
    {"Domain": "Rural Development", "Count": 3},
    {"Domain": "Others", "Count": 3},
    {"Domain": "Child Rights", "Count": 2},
    {"Domain": "Education (Csr)", "Count": 2},
    {"Domain": "Gender", "Count": 2}
  ],
  "total_organizations": 90,
  "summary_stats": {
    "total_orgs": 90,
    "unique_domains": 27,
    "states_covered": 2,
    "multi_domain_percentage": 53.3
  }
};

// Generate sample organization data for the table
const generateOrgData = () => {
  const orgNames = [
    "Akshaya Patra Foundation", "Teach for India", "Goonj", "Pratham", "CRY - Child Rights and You",
    "Helpage India", "Smile Foundation", "Save the Children India", "Oxfam India", "World Vision India",
    "Room to Read", "Magic Bus", "United Way", "Breakthrough", "Labournet", "SEWA", "MYRADA",
    "PRADAN", "Grameen Foundation", "Deshpande Foundation", "Azim Premji Foundation", "Naandi Foundation",
    "Agastya International Foundation", "Barefoot College", "Centre for Science and Environment",
    "Wildlife Protection Society", "Greenpeace India", "WWF India", "Chintan", "Toxics Link",
    "TERI", "Development Alternatives", "Aravali", "Greenpeace", "Water Aid", "Arghyam",
    "eVidyaloka", "Digital Empowerment Foundation", "Quest Alliance", "India School Leadership Institute",
    "Edubridge", "STEM Learning", "Rocket Learning", "Kaivalya Education Foundation", "Aide et Action",
    "Population Foundation of India", "MAMTA", "PATH", "JSS", "CORD", "Voluntary Health Association",
    "Arogya World", "Cancer Patients Aid Association", "Tata Trusts", "Infosys Foundation",
    "HCL Foundation", "Wipro Foundation", "TCS Foundation", "Mahindra Foundation", "Godrej Good & Green",
    "Larsen & Toubro Public Charitable Trust", "JSW Foundation", "Reliance Foundation", "Bharti Foundation",
    "Tech Mahindra Foundation", "Cognizant Foundation", "Oracle Giving", "Microsoft India", "Google.org India",
    "Facebook India", "Amazon India", "Flipkart Foundation", "Paytm Foundation", "Ola Foundation",
    "Zomato Feeding India", "BigBasket Foundation", "Swiggy Access", "Byju's Education for All",
    "Unacademy Foundation", "LEAD Foundation", "Vedantu Cares", "Toppr Foundation", "Embibe Foundation",
    "WhiteHat Jr Foundation", "Coding Ninjas Foundation", "Scaler Academy Foundation", "UpGrad Foundation",
    "Great Learning Foundation", "Simplilearn Foundation", "Coursera India", "Udacity India", "edX India",
    "Khan Academy India", "Duolingo for Schools India", "Scratch Foundation India", "Code.org India"
  ];

  const statuses = ["Cold", "Luke Warm", "Warm"];
  const domains = ["YES", "NO"];
  const states = ["DELHI-NCR", "MUMBAI"];
  const mainDomains = [
    "Education", "Health", "Environment", "Livelihood", "Consulting", 
    "Rural Development", "Others", "Child Rights", "Education (Csr)", "Gender"
  ];

  return orgNames.slice(0, 90).map((name, index) => ({
    id: index + 1,
    orgName: name,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    multipleDomain: domains[Math.floor(Math.random() * domains.length)],
    baseState: states[Math.floor(Math.random() * states.length)],
    mainDomain: mainDomains[Math.floor(Math.random() * mainDomains.length)]
  }));
};

// Global variables
let charts = {};
let orgData = generateOrgData();
let filteredData = [...orgData];
let currentFilters = {
  status: 'all',
  domain: 'all',
  state: 'all'
};
let currentPage = 1;
const itemsPerPage = 10;

// Chart colors (neon theme)
const neonColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
  initializeFilters();
  initializeTable();
  updateSummaryStats();
});

// Initialize all charts
function initializeCharts() {
  createStatusChart();
  createDomainChart();
  createStateChart();
  createMainDomainChart();
}

// Create Organization Status Chart (Pie Chart)
function createStatusChart() {
  const ctx = document.getElementById('statusChart').getContext('2d');
  const data = dashboardData.org_status_data;
  
  charts.statusChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.map(item => item.Status),
      datasets: [{
        data: data.map(item => item.Count),
        backgroundColor: ['#00ffff', '#ff00ff', '#00ff00'],
        borderColor: ['#00ffff', '#ff00ff', '#00ff00'],
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#ffffff',
            font: {
              size: 12
            },
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#00ffff',
          bodyColor: '#ffffff',
          borderColor: '#00ffff',
          borderWidth: 1
        }
      }
    }
  });
}

// Create Multiple Domain Chart (Bar Chart)
function createDomainChart() {
  const ctx = document.getElementById('domainChart').getContext('2d');
  const data = dashboardData.multiple_domain_data;
  
  charts.domainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.Has_Multiple_Domains),
      datasets: [{
        label: 'Organizations',
        data: data.map(item => item.Count),
        backgroundColor: ['#ff00ff', '#ff8c00'],
        borderColor: ['#ff00ff', '#ff8c00'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ff00ff',
          bodyColor: '#ffffff',
          borderColor: '#ff00ff',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Create Base State Chart (Bar Chart)
function createStateChart() {
  const ctx = document.getElementById('stateChart').getContext('2d');
  const data = dashboardData.base_state_data;
  
  charts.stateChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.State),
      datasets: [{
        label: 'Organizations',
        data: data.map(item => item.Count),
        backgroundColor: ['#00ff00', '#ff8c00'],
        borderColor: ['#00ff00', '#ff8c00'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#00ff00',
          bodyColor: '#ffffff',
          borderColor: '#00ff00',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Create Main Domain Chart (Horizontal Bar Chart)
function createMainDomainChart() {
  const ctx = document.getElementById('mainDomainChart').getContext('2d');
  const data = dashboardData.main_domain_data;
  
  charts.mainDomainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.Domain),
      datasets: [{
        label: 'Organizations',
        data: data.map(item => item.Count),
        backgroundColor: neonColors.slice(0, data.length),
        borderColor: neonColors.slice(0, data.length),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ff8c00',
          bodyColor: '#ffffff',
          borderColor: '#ff8c00',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Initialize filter functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.neon-btn[data-filter]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterType = this.getAttribute('data-filter');
      const filterValue = this.getAttribute('data-value');
      
      // Update button states
      const siblingButtons = this.parentNode.querySelectorAll('.neon-btn');
      siblingButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update filters
      currentFilters[filterType] = filterValue;
      
      // Apply filters
      applyFilters();
    });
  });
}

// Apply filters to data and update charts
function applyFilters() {
  filteredData = orgData.filter(org => {
    const statusMatch = currentFilters.status === 'all' || org.status === currentFilters.status;
    const domainMatch = currentFilters.domain === 'all' || org.multipleDomain === currentFilters.domain;
    const stateMatch = currentFilters.state === 'all' || org.baseState === currentFilters.state;
    
    return statusMatch && domainMatch && stateMatch;
  });
  
  updateChartsWithFilteredData();
  updateTable();
  updateSummaryStats();
}

// Update charts with filtered data
function updateChartsWithFilteredData() {
  // Update status chart
  const statusCounts = {};
  filteredData.forEach(org => {
    statusCounts[org.status] = (statusCounts[org.status] || 0) + 1;
  });
  
  const statusData = Object.keys(statusCounts).map(status => ({
    Status: status,
    Count: statusCounts[status]
  }));
  
  charts.statusChart.data.labels = statusData.map(item => item.Status);
  charts.statusChart.data.datasets[0].data = statusData.map(item => item.Count);
  charts.statusChart.update();
  
  // Update domain chart
  const domainCounts = {};
  filteredData.forEach(org => {
    domainCounts[org.multipleDomain] = (domainCounts[org.multipleDomain] || 0) + 1;
  });
  
  const domainData = Object.keys(domainCounts).map(domain => ({
    Has_Multiple_Domains: domain,
    Count: domainCounts[domain]
  }));
  
  charts.domainChart.data.labels = domainData.map(item => item.Has_Multiple_Domains);
  charts.domainChart.data.datasets[0].data = domainData.map(item => item.Count);
  charts.domainChart.update();
  
  // Update state chart
  const stateCounts = {};
  filteredData.forEach(org => {
    stateCounts[org.baseState] = (stateCounts[org.baseState] || 0) + 1;
  });
  
  const stateData = Object.keys(stateCounts).map(state => ({
    State: state,
    Count: stateCounts[state]
  }));
  
  charts.stateChart.data.labels = stateData.map(item => item.State);
  charts.stateChart.data.datasets[0].data = stateData.map(item => item.Count);
  charts.stateChart.update();
  
  // Update main domain chart
  const mainDomainCounts = {};
  filteredData.forEach(org => {
    mainDomainCounts[org.mainDomain] = (mainDomainCounts[org.mainDomain] || 0) + 1;
  });
  
  const mainDomainData = Object.keys(mainDomainCounts).map(domain => ({
    Domain: domain,
    Count: mainDomainCounts[domain]
  })).sort((a, b) => b.Count - a.Count);
  
  charts.mainDomainChart.data.labels = mainDomainData.map(item => item.Domain);
  charts.mainDomainChart.data.datasets[0].data = mainDomainData.map(item => item.Count);
  charts.mainDomainChart.update();
}

// Initialize table functionality
function initializeTable() {
  const searchInput = document.getElementById('searchInput');
  const tableHeaders = document.querySelectorAll('.sortable');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const exportBtn = document.getElementById('exportBtn');
  
  // Search functionality
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filteredData = orgData.filter(org => {
      const matchesSearch = Object.values(org).some(value => 
        value.toString().toLowerCase().includes(searchTerm)
      );
      const statusMatch = currentFilters.status === 'all' || org.status === currentFilters.status;
      const domainMatch = currentFilters.domain === 'all' || org.multipleDomain === currentFilters.domain;
      const stateMatch = currentFilters.state === 'all' || org.baseState === currentFilters.state;
      
      return matchesSearch && statusMatch && domainMatch && stateMatch;
    });
    
    currentPage = 1;
    updateTable();
  });
  
  // Sort functionality
  tableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const column = this.getAttribute('data-column');
      sortTable(column);
    });
  });
  
  // Pagination
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });
  
  nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateTable();
    }
  });
  
  // Export functionality
  exportBtn.addEventListener('click', exportData);
  
  updateTable();
}

// Update table with current data
function updateTable() {
  const tbody = document.getElementById('tableBody');
  const pageInfo = document.getElementById('pageInfo');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const pageData = filteredData.slice(startIndex, endIndex);
  
  // Clear table
  tbody.innerHTML = '';
  
  // Populate table
  pageData.forEach(org => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${org.orgName}</td>
      <td><span class="status status--${org.status.toLowerCase().replace(' ', '-')}">${org.status}</span></td>
      <td>${org.multipleDomain}</td>
      <td>${org.baseState}</td>
      <td>${org.mainDomain}</td>
    `;
    tbody.appendChild(row);
  });
  
  // Update pagination
  pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${filteredData.length} total)`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

// Sort table by column
let sortOrder = {};
function sortTable(column) {
  const isAscending = !sortOrder[column];
  sortOrder[column] = isAscending;
  
  filteredData.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (aVal < bVal) return isAscending ? -1 : 1;
    if (aVal > bVal) return isAscending ? 1 : -1;
    return 0;
  });
  
  currentPage = 1;
  updateTable();
}

// Update summary statistics
function updateSummaryStats() {
  const totalOrgs = filteredData.length;
  const uniqueDomains = new Set(filteredData.map(org => org.mainDomain)).size;
  const statesCovered = new Set(filteredData.map(org => org.baseState)).size;
  const multiDomainCount = filteredData.filter(org => org.multipleDomain === 'YES').length;
  const multiDomainPercentage = totalOrgs > 0 ? ((multiDomainCount / totalOrgs) * 100).toFixed(1) : 0;
  
  document.getElementById('totalOrgs').textContent = totalOrgs;
  document.getElementById('uniqueDomains').textContent = uniqueDomains;
  document.getElementById('statesCovered').textContent = statesCovered;
  document.getElementById('multiDomainPercentage').textContent = `${multiDomainPercentage}%`;
}

// Export data functionality
function exportData() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Organization Name,Status,Multiple Domain,Base State,Main Domain\n"
    + filteredData.map(org => 
        `"${org.orgName}","${org.status}","${org.multipleDomain}","${org.baseState}","${org.mainDomain}"`
      ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "organization_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}