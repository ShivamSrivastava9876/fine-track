export async function getDailyReport() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }

        const response = await fetch(
            'http://195.35.22.200:8000/report/daily-report/',
            {
                method: "GET",
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data }
        }
        else {
            const error = await response.text();
            return { error };
        }
    }
    catch (error) {
        return { error };
    }
}

export async function getWeeklyReport() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }

        const response = await fetch(
            'http://195.35.22.200:8000/report/weekly-report/',
            {
                method: "GET",
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data }
        }
        else {
            const error = await response.text();
            return { error };
        }
    }
    catch (error) {
        return { error };
    }
}

export async function getMonthlyReport() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }

        const response = await fetch(
            'http://195.35.22.200:8000/report/monthly-report/',
            {
                method: "GET",
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data }
        }
        else {
            const error = await response.text();
            return { error };
        }
    }
    catch (error) {
        return { error };
    }
}

export async function getYearlyReport() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }

        const response = await fetch(
            'http://195.35.22.200:8000/report/yearly-report/',
            {
                method: "GET",
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data }
        }
        else {
            const error = await response.text();
            return { error };
        }
    }
    catch (error) {
        return { error };
    }
}

export async function getDailyReportData() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://195.35.22.200:8000/report/daily-list-report/',
            {
                method: 'GET',
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
};

export async function getWeeklyReportData() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://195.35.22.200:8000/report/weekly-list-report/',
            {
                method: 'GET',
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
};

export async function getMonthlyReportData() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://195.35.22.200:8000/report/monthly-list-report/',
            {
                method: 'GET',
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
};

export async function getYearlyReportData() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://195.35.22.200:8000/report/yearly-list-report/',
            {
                method: 'GET',
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
};