#include "flipflops.h"

int SR_flipflop(int S, int R, int current_Q)
{
    if (S == 0 && R == 0)
    {
        return current_Q;
    }
    else if (S == 1 && R == 0)
    {
        return 1;
    }
    else if (S == 0 && R == 1)
    {
        return 0;
    }
    else
    {
        return -1;
    }
}

int D_flipflop(int D)
{
    return D;
}
int JK_flipflop(int J, int K, int current_Q)
{
    if (J == 0 && K == 0)
    {
        return current_Q;
    }
    else if (J == 0 && K == 1)
    {
        return 0;
    }
    else if (J == 1 && K == 0)
    {
        return 1;
    }
    else
    {
        return !current_Q;
    }
}
int T_flipflop(int T, int current_Q)
{
    if (T == 0)
    {
        return current_Q;
    }
    else
    {
        return !current_Q;
    }
}