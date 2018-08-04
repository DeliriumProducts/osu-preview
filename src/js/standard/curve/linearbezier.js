function LinearBezier(points, pixelLength, linear)
{
    // https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/LinearBezier.java
    let beziers = [],
        controls = [],
        last;
    for (let i = 0; i < points.length; i++)
    {
        let point = points[i];
        if (linear)
        {
            if (typeof last != 'undefined')
            {
                controls.push(point);
                beziers.push(new Bezier2(controls));
                controls = [];
            }
        }
        else if (point.equalTo(last))
        {
            try
            {
                beziers.push(new Bezier2(controls));
            }
            catch (e) {}
            controls = [];
        }
        controls.push(point);
        last = point;
    }
    try
    {
        beziers.push(new Bezier2(controls));
    }
    catch (e) {}

    EqualDistanceMultiCurve.call(this, beziers, pixelLength);
};
LinearBezier.prototype = Object.create(EqualDistanceMultiCurve.prototype);
LinearBezier.prototype.constructor = LinearBezier;
