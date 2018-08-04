function CentripetalCatmullRom(points)
{
    // https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/CentripetalCatmullRom.java
    // needs 4 points
    if (points.length != 4)
    {
        throw 'invalid data';
    }

    this.points = points;
    let approxLength = 0;
    for (let i = 1; i < 4; i++)
    {
        approxLength += this.points[i].distanceTo(this.points[i - 1]);
    }

    CurveType.call(this, approxLength / 2);
}
CentripetalCatmullRom.prototype = Object.create(CurveType.prototype);
CentripetalCatmullRom.prototype.constructor = CentripetalCatmullRom;
CentripetalCatmullRom.prototype.pointAt = function(t)
{
    t = Math.lerp(1, 2, t);
    let A1 = this.points[0].clone().scale(1 - t).translate(this.points[1].clone().scale(t));
    let A2 = this.points[1].clone().scale(2 - t).translate(this.points[2].clone().scale(t - 1));
    let A3 = this.points[2].clone().scale(3 - t).translate(this.points[3].clone().scale(t - 2));
    let B1 = A1.clone().scale(2 - t).translate(A2.clone().scale(t));
    let B2 = A2.clone().scale(3 - t).translate(A3.clone().scale(t - 1));
    return B1.clone().scale(2 - t).translate(B2.clone().scale(t - 1)).scale(0.5);
};
