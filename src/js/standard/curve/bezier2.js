function Bezier2(points)
{
    // https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/Bezier2.java
    if (points.length < 2)
    {
        throw 'invalid data';
    }

    this.points = points;
    let approxLength = 0;
    for (let i = 1; i < this.points.length; i++)
    {
        approxLength += this.points[i].distanceTo(this.points[i - 1]);
    }

    CurveType.call(this, approxLength);
}
Bezier2.prototype = Object.create(CurveType.prototype);
Bezier2.prototype.constructor = Bezier2;
Bezier2.prototype.pointAt = function(t)
{
    let n = this.points.length - 1,
        point = new Point(),
        combination = 1;
    for (let i = 0; i <= n; i++)
    {
        let bernstein = combination * Math.pow(t, i) * Math.pow(1 - t, n - i);
        point.x += this.points[i].x * bernstein;
        point.y += this.points[i].y * bernstein;
        combination = combination * (n - i) / (i + 1);
    }
    return point;
};
