#include <stdio.h>
#include "counter.h"
#include "flipflops.h"

void four_bit_counter()
{
    int Q0 = 0;
    int Q1 = 0;
    int Q2 = 0;
    int Q3 = 0;
    int cycles;

    printf("\n========== 4-BIT BINARY COUNTER ==========\n");

    printf("Enter number of clock cycles: ");
    scanf("%d", &cycles);

    printf("\nCLOCK    Q3 Q2 Q1 Q0\n");
    printf("--------------------\n");

    for (int i = 1; i <= cycles; i++)
    {
      Q0 = T_flipflop(1, Q0);

    if (Q0 == 0)
    {
    Q1 = T_flipflop(1, Q1);
    }

    if (Q1 == 0 && Q0 == 0)
    {
    Q2 = T_flipflop(1, Q2);
    }

    if (Q2 == 0 && Q1 == 0 && Q0 == 0)
    {
    Q3 = T_flipflop(1, Q3);
        }

       printf("  %2d      %d  %d  %d  %d\n",
       i, Q3, Q2, Q1, Q0);
    }

    printf("\n===========================================\n");
}