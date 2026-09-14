#include "gates.h"

int AND_gate(int a, int b)
{
    return a && b;
}

int OR_gate(int a, int b)
{
    return a || b;
}

int NOT_gate(int a)
{
    return !a;
}

int NAND_gate(int a, int b)
{
    return !(a && b);
}

int NOR_gate(int a, int b)
{
    return !(a || b);
}

int XOR_gate(int a, int b)
{
    return a ^ b;
}

int XNOR_gate(int a, int b)
{
    return !(a ^ b);
}