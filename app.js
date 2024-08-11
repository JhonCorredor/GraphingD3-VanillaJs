document.getElementById('update-data').addEventListener('click', function() {
    const input = document.getElementById('source-data').value;

    if (!/^\s*\d+(\s*,\s*\d+)*\s*$/.test(input)) {
        alert('Please enter a valid list of numbers separated by commas.');
        return;
    }

    const data = input.split(',').map(d => parseInt(d.trim()));

    createBarChart(data);
});

function createBarChart(data) {
    const svgWidth = 600;
    const svgHeight = 400;
    const barPadding = 5;
    const barHeight = svgHeight / data.length;

    const colors = ['#4CAF50', '#FF9800', '#00BCD4', '#E91E63', '#9C27B0'];

    d3.select('#chart').selectAll('*').remove();

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, svgWidth]);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * barHeight)
        .attr('width', d => xScale(d))
        .attr('height', barHeight - barPadding)
        .attr('fill', (d, i) => colors[i % colors.length]);

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', d => {
            const textPosition = xScale(d) + 5;
            return textPosition > svgWidth - 30 ? textPosition - 30 : textPosition;
        })
        .attr('y', (d, i) => i * barHeight + (barHeight - barPadding) / 2 + 5)
        .attr('fill', '#000');
}
